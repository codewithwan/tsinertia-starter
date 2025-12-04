<?php

/** @phpstan-ignore-file */
use App\Models\User;
use Spatie\Permission\Models\Permission;
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

test('superadmin can view roles index', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)->get('/admin/roles');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('admin/roles/index')
            ->has('roles')
            ->has('permissions')
    );
});

test('admin cannot view roles index', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $response = $this->actingAs($admin)->get('/admin/roles');

    $response->assertForbidden();
});

test('superadmin can create a new role', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $permission = Permission::create(['name' => 'test.permission']);

    $response = $this->actingAs($superadmin)
        ->post('/admin/roles', [
            'name' => 'moderator',
            'permissions' => [$permission->id],
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('roles', [
        'name' => 'moderator',
    ]);

    $role = Role::where('name', 'moderator')->first();
    expect($role->hasPermissionTo('test.permission'))->toBeTrue();
});

test('role creation requires unique name', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $existingRole = Role::create(['name' => 'existing']);

    $response = $this->actingAs($superadmin)
        ->post('/admin/roles', [
            'name' => 'existing',
            'permissions' => [],
        ]);

    $response->assertSessionHasErrors('name');
});

test('role creation requires valid permissions', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)
        ->post('/admin/roles', [
            'name' => 'newrole',
            'permissions' => [99999],
        ]);

    $response->assertSessionHasErrors('permissions.0');
});

test('superadmin can update a role', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $role = Role::create(['name' => 'testrole']);
    $permission1 = Permission::create(['name' => 'permission1']);
    $permission2 = Permission::create(['name' => 'permission2']);

    $response = $this->actingAs($superadmin)
        ->put("/admin/roles/{$role->id}", [
            'name' => 'updatedrole',
            'permissions' => [$permission1->id, $permission2->id],
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $role->refresh();
    expect($role->name)->toBe('updatedrole');
    expect($role->hasPermissionTo('permission1'))->toBeTrue();
    expect($role->hasPermissionTo('permission2'))->toBeTrue();
});

test('superadmin cannot update superadmin role', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $permission = Permission::create(['name' => 'test.permission']);

    $response = $this->actingAs($superadmin)
        ->put("/admin/roles/{$this->superadminRole->id}", [
            'name' => 'modified',
            'permissions' => [$permission->id],
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('error');
});

test('superadmin can delete a role', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $role = Role::create(['name' => 'deletable']);

    $response = $this->actingAs($superadmin)
        ->delete("/admin/roles/{$role->id}");

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseMissing('roles', [
        'name' => 'deletable',
    ]);
});

test('superadmin cannot delete superadmin role', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)
        ->delete("/admin/roles/{$this->superadminRole->id}");

    $response->assertRedirect();
    $response->assertSessionHas('error');

    $this->assertDatabaseHas('roles', [
        'name' => 'superadmin',
    ]);
});

test('role update requires unique name excluding current role', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $role1 = Role::create(['name' => 'role1']);
    $role2 = Role::create(['name' => 'role2']);

    $response = $this->actingAs($superadmin)
        ->put("/admin/roles/{$role1->id}", [
            'name' => 'role2',
            'permissions' => [],
        ]);

    $response->assertSessionHasErrors('name');
});

