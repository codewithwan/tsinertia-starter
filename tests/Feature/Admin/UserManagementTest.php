<?php

/** @phpstan-ignore-file */
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Spatie\Permission\Models\Role;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    /** @var Role $superadminRole */
    $superadminRole = Role::create(['name' => 'superadmin']);
    /** @var Role $adminRole */
    $adminRole = Role::create(['name' => 'admin']);
    /** @var Role $userRole */
    $userRole = Role::create(['name' => 'user']);
    
    $this->superadminRole = $superadminRole;
    $this->adminRole = $adminRole;
    $this->userRole = $userRole;
});

test('superadmin can view users index', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)->get('/admin/users');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('admin/users/index'));
});

test('admin can view users index', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $response = $this->actingAs($admin)->get('/admin/users');

    $response->assertOk();
});

test('regular user cannot view users index', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->get('/admin/users');

    $response->assertForbidden();
});

test('admin cannot see superadmin users', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $regularUser = User::factory()->create();
    $regularUser->assignRole($this->userRole);

    $response = $this->actingAs($admin)->get('/admin/users');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->has('users.data')
            ->where('users.data', function ($users) use ($superadmin) {
                return !collect($users)->contains('id', $superadmin->id);
            })
    );
});

test('superadmin can see all users', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $regularUser = User::factory()->create();
    $regularUser->assignRole($this->userRole);

    $response = $this->actingAs($superadmin)->get('/admin/users');

    $response->assertOk();
});

test('users index can be searched', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user1 = User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);
    $user2 = User::factory()->create(['name' => 'Jane Smith', 'email' => 'jane@example.com']);

    $response = $this->actingAs($superadmin)->get('/admin/users?search=John');

    $response->assertOk();
});

test('users index supports pagination', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    User::factory()->count(15)->create();

    $response = $this->actingAs($superadmin)->get('/admin/users?per_page=10');

    $response->assertOk();
});

test('superadmin can view user details', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($superadmin)->get("/admin/users/{$user->id}");

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('admin/users/show')
            ->has('user')
    );
});

test('admin cannot view superadmin details', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($admin)->get("/admin/users/{$superadmin->id}");

    $response->assertForbidden();
});

test('superadmin can edit user roles', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($superadmin)->get("/admin/users/{$user->id}/edit");

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('admin/users/edit')
            ->has('user')
            ->has('roles')
    );
});

test('admin cannot edit user roles', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($admin)->get("/admin/users/{$user->id}/edit");

    $response->assertForbidden();
});

test('superadmin cannot edit own roles', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)->get("/admin/users/{$superadmin->id}/edit");

    $response->assertForbidden();
});

test('superadmin can update user roles', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $adminRoleId = $this->adminRole->id;

    $response = $this->actingAs($superadmin)
        ->put("/admin/users/{$user->id}/roles", [
            'role_id' => $adminRoleId,
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $user->refresh();
    expect($user->hasRole('admin'))->toBeTrue();
});

test('superadmin cannot update superadmin user roles', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $otherSuperadmin = User::factory()->create();
    $otherSuperadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)
        ->put("/admin/users/{$otherSuperadmin->id}/roles", [
            'role_id' => $this->userRole->id,
        ]);

    $response->assertForbidden();
});

test('superadmin can send reset password link to user', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    Password::shouldReceive('sendResetLink')
        ->once()
        ->andReturn(Password::RESET_LINK_SENT);

    $response = $this->actingAs($superadmin)
        ->post("/admin/users/{$user->id}/send-reset-password");

    $response->assertRedirect();
    $response->assertSessionHas('success');
});

test('admin cannot send reset password to admin users', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $otherAdmin = User::factory()->create();
    $otherAdmin->assignRole($this->adminRole);

    $response = $this->actingAs($admin)
        ->post("/admin/users/{$otherAdmin->id}/send-reset-password");

    $response->assertForbidden();
});

test('role update requires valid role id', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($superadmin)
        ->put("/admin/users/{$user->id}/roles", [
            'role_id' => 99999,
        ]);

    $response->assertSessionHasErrors('role_id');
});

