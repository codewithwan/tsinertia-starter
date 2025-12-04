<?php

/** @phpstan-ignore-file */
use App\Models\ActivityLog;
use App\Models\User;
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

test('user can view their own activity logs', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    ActivityLog::create([
        'user_id' => $user->id,
        'action' => 'login',
        'description' => 'User logged in',
    ]);

    $response = $this->actingAs($user)->get('/settings/activity');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('activity/index')
            ->has('activityLogs')
    );
});

test('user cannot see other users activity logs', function () {
    $user1 = User::factory()->create();
    $user1->assignRole($this->userRole);

    $user2 = User::factory()->create();
    $user2->assignRole($this->userRole);

    ActivityLog::create([
        'user_id' => $user2->id,
        'action' => 'login',
        'description' => 'Other user logged in',
    ]);

    $response = $this->actingAs($user1)->get('/settings/activity');

    $response->assertOk();
});

test('superadmin can view all activity logs', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    ActivityLog::create([
        'user_id' => $user->id,
        'action' => 'login',
        'description' => 'User logged in',
    ]);

    $response = $this->actingAs($superadmin)->get('/settings/activity');

    $response->assertOk();
});

test('admin can view non-admin activity logs', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    ActivityLog::create([
        'user_id' => $user->id,
        'action' => 'login',
        'description' => 'User logged in',
    ]);

    $response = $this->actingAs($admin)->get('/settings/activity');

    $response->assertOk();
});

test('admin cannot see superadmin activity logs', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    ActivityLog::create([
        'user_id' => $superadmin->id,
        'action' => 'login',
        'description' => 'Superadmin logged in',
    ]);

    $response = $this->actingAs($admin)->get('/settings/activity');

    $response->assertOk();
});

test('activity logs can be filtered by user', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    ActivityLog::create([
        'user_id' => $user->id,
        'action' => 'login',
        'description' => 'User logged in',
    ]);

    $response = $this->actingAs($superadmin)->get("/settings/activity?user_id={$user->id}");

    $response->assertOk();
});

test('activity logs can be filtered by action', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    ActivityLog::create([
        'action' => 'login',
        'description' => 'User logged in',
    ]);

    ActivityLog::create([
        'action' => 'logout',
        'description' => 'User logged out',
    ]);

    $response = $this->actingAs($superadmin)->get('/settings/activity?action=login');

    $response->assertOk();
});

test('activity logs can be searched', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    ActivityLog::create([
        'action' => 'login',
        'description' => 'User logged in successfully',
    ]);

    ActivityLog::create([
        'action' => 'logout',
        'description' => 'User logged out',
    ]);

    $response = $this->actingAs($superadmin)->get('/settings/activity?search=successfully');

    $response->assertOk();
});

test('activity logs can be filtered by date range', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)->get('/settings/activity?date_from=2024-01-01&date_to=2024-12-31');

    $response->assertOk();
});

test('superadmin can delete old activity logs', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $oldLog = ActivityLog::create([
        'action' => 'old_action',
        'description' => 'Old log',
    ]);
    $oldLog->created_at = now()->subDays(100);
    $oldLog->save();

    ActivityLog::create([
        'action' => 'recent_action',
        'description' => 'Recent log',
        'created_at' => now()->subDays(30),
    ]);

    $response = $this->actingAs($superadmin)->post('/admin/activity/delete-old');

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseMissing('activity_logs', [
        'description' => 'Old log',
    ]);

    $this->assertDatabaseHas('activity_logs', [
        'description' => 'Recent log',
    ]);
});

test('admin cannot delete old activity logs', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $response = $this->actingAs($admin)->post('/admin/activity/delete-old');

    $response->assertForbidden();
});

test('activity logs can be exported as csv', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    ActivityLog::create([
        'action' => 'login',
        'description' => 'Test log',
    ]);

    $response = $this->actingAs($superadmin)->get('/settings/activity?export=csv');

    $response->assertOk();
    expect($response->headers->get('Content-Type'))->toContain('text/csv');
});

test('activity logs can be exported as json', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    ActivityLog::create([
        'action' => 'login',
        'description' => 'Test log',
    ]);

    $response = $this->actingAs($superadmin)->get('/settings/activity?export=json');

    $response->assertOk();
    $response->assertHeader('Content-Type', 'application/json');
});

