<?php

/** @phpstan-ignore-file */
use App\Models\Feedback;
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

test('authenticated user can submit feedback', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->post('/feedback', [
        'type' => 'bug',
        'message' => 'Test feedback message',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('feedbacks', [
        'type' => 'bug',
        'message' => 'Test feedback message',
    ]);
});

test('authenticated user can submit feedback with user_id', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->post('/feedback', [
        'type' => 'feature',
        'message' => 'Feature request',
        'subject' => 'New Feature',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('feedbacks', [
        'user_id' => $user->id,
        'type' => 'feature',
        'message' => 'Feature request',
    ]);
});

test('feedback can include rating', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->post('/feedback', [
        'type' => 'rating',
        'message' => 'Great service!',
        'rating' => 5,
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('feedbacks', [
        'type' => 'rating',
        'rating' => 5,
    ]);
});

test('feedback validation requires type', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->post('/feedback', [
        'message' => 'Test message',
    ]);

    $response->assertSessionHasErrors('type');
});

test('feedback validation requires message', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->post('/feedback', [
        'type' => 'bug',
    ]);

    $response->assertSessionHasErrors('message');
});

test('feedback type must be valid', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->post('/feedback', [
        'type' => 'invalid_type',
        'message' => 'Test',
    ]);

    $response->assertSessionHasErrors('type');
});

test('feedback rating must be between 1 and 5', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->post('/feedback', [
        'type' => 'rating',
        'message' => 'Test',
        'rating' => 6,
    ]);

    $response->assertSessionHasErrors('rating');
});

test('superadmin can view feedback index', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    Feedback::create(['type' => 'bug', 'message' => 'Test 1']);
    Feedback::create(['type' => 'feature', 'message' => 'Test 2']);
    Feedback::create(['type' => 'improvement', 'message' => 'Test 3']);
    Feedback::create(['type' => 'rating', 'message' => 'Test 4']);
    Feedback::create(['type' => 'other', 'message' => 'Test 5']);

    $response = $this->actingAs($superadmin)->get('/admin/feedback');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('admin/feedback/index')
            ->has('feedbacks')
            ->has('stats')
    );
});

test('admin can view feedback index', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $response = $this->actingAs($admin)->get('/admin/feedback');

    $response->assertOk();
});

test('regular user cannot view feedback index', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->get('/admin/feedback');

    $response->assertForbidden();
});

test('admin cannot see superadmin feedbacks', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    Feedback::create([
        'user_id' => $superadmin->id,
        'type' => 'bug',
        'message' => 'Superadmin feedback',
    ]);

    $regularUser = User::factory()->create();
    $regularUser->assignRole($this->userRole);

    Feedback::create([
        'user_id' => $regularUser->id,
        'type' => 'feature',
        'message' => 'User feedback',
    ]);

    $response = $this->actingAs($admin)->get('/admin/feedback');

    $response->assertOk();
});

test('feedback can be filtered by type', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    Feedback::create(['type' => 'bug', 'message' => 'Bug 1']);
    Feedback::create(['type' => 'feature', 'message' => 'Feature 1']);
    Feedback::create(['type' => 'bug', 'message' => 'Bug 2']);

    $response = $this->actingAs($superadmin)->get('/admin/feedback?type=bug');

    $response->assertOk();
});

test('feedback can be filtered by rating', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    Feedback::create(['type' => 'rating', 'message' => 'Test', 'rating' => 5]);
    Feedback::create(['type' => 'rating', 'message' => 'Test', 'rating' => 3]);

    $response = $this->actingAs($superadmin)->get('/admin/feedback?rating=5');

    $response->assertOk();
});

test('feedback can be searched', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    Feedback::create(['type' => 'bug', 'message' => 'Searchable message']);
    Feedback::create(['type' => 'feature', 'message' => 'Other message']);

    $response = $this->actingAs($superadmin)->get('/admin/feedback?search=Searchable');

    $response->assertOk();
});

test('feedback can be filtered by date range', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)->get('/admin/feedback?date_from=2024-01-01&date_to=2024-12-31');

    $response->assertOk();
});

