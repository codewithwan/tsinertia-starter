<?php

/** @phpstan-ignore-file */
use App\Models\User;
use App\Notifications\SystemNotification;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Notification;
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

test('user can view their notifications', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $user->notify(new SystemNotification(
        title: 'Test Notification',
        message: 'This is a test notification'
    ));

    $response = $this->actingAs($user)->get('/notifications');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('notifications/index')
            ->has('notifications')
    );
});

test('user can mark notification as read', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $notification = $user->notify(new SystemNotification(
        title: 'Test',
        message: 'Test message'
    ));

    $notificationId = DatabaseNotification::first()->id;

    $response = $this->actingAs($user)
        ->post("/notifications/{$notificationId}/read");

    $response->assertRedirect();
    $response->assertSessionHas('status');

    $notification = DatabaseNotification::find($notificationId);
    expect($notification->read_at)->not->toBeNull();
});

test('user cannot mark other users notification as read', function () {
    $user1 = User::factory()->create();
    $user1->assignRole($this->userRole);

    $user2 = User::factory()->create();
    $user2->assignRole($this->userRole);

    $notification = $user2->notify(new SystemNotification(
        title: 'Test',
        message: 'Test message'
    ));

    $notificationId = DatabaseNotification::first()->id;

    $response = $this->actingAs($user1)
        ->post("/notifications/{$notificationId}/read");

    $response->assertForbidden();
});

test('user can mark all notifications as read', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $user->notify(new SystemNotification(title: 'Test 1', message: 'Message 1'));
    $user->notify(new SystemNotification(title: 'Test 2', message: 'Message 2'));

    $response = $this->actingAs($user)->post('/notifications/read-all');

    $response->assertRedirect();
    $response->assertSessionHas('status');

    expect($user->fresh()->unreadNotifications)->toHaveCount(0);
});

test('superadmin can send notification to users', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user1 = User::factory()->create();
    $user1->assignRole($this->userRole);

    $user2 = User::factory()->create();
    $user2->assignRole($this->userRole);

    Notification::fake();

    $response = $this->actingAs($superadmin)
        ->post('/admin/notifications/send', [
            'user_ids' => [$user1->id, $user2->id],
            'title' => 'Test Notification',
            'message' => 'Test message',
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    Notification::assertSentTo([$user1, $user2], SystemNotification::class);
});

test('admin can send notification to regular users', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    Notification::fake();

    $response = $this->actingAs($admin)
        ->post('/admin/notifications/send', [
            'user_ids' => [$user->id],
            'title' => 'Test Notification',
            'message' => 'Test message',
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    Notification::assertSentTo($user, SystemNotification::class);
});

test('admin cannot send notification to admin users', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $otherAdmin = User::factory()->create();
    $otherAdmin->assignRole($this->adminRole);

    $response = $this->actingAs($admin)
        ->post('/admin/notifications/send', [
            'user_ids' => [$otherAdmin->id],
            'title' => 'Test Notification',
            'message' => 'Test message',
        ]);

    $response->assertForbidden();
});

test('admin cannot send notification to superadmin users', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($admin)
        ->post('/admin/notifications/send', [
            'user_ids' => [$superadmin->id],
            'title' => 'Test Notification',
            'message' => 'Test message',
        ]);

    $response->assertForbidden();
});

test('superadmin can broadcast notification to all users', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user1 = User::factory()->create();
    $user2 = User::factory()->create();

    Notification::fake();

    $response = $this->actingAs($superadmin)
        ->post('/admin/notifications/broadcast', [
            'title' => 'Broadcast Notification',
            'message' => 'This is a broadcast message',
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    Notification::assertSentTo([$user1, $user2], SystemNotification::class);
});

test('admin cannot broadcast notification', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $response = $this->actingAs($admin)
        ->post('/admin/notifications/broadcast', [
            'title' => 'Broadcast',
            'message' => 'Test',
        ]);

    $response->assertForbidden();
});

test('superadmin can view notification management page', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)->get('/admin/notifications/manage');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('admin/notifications/manage')
            ->has('users')
    );
});

test('admin can view notification management page', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $response = $this->actingAs($admin)->get('/admin/notifications/manage');

    $response->assertOk();
});

test('regular user cannot view notification management page', function () {
    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($user)->get('/admin/notifications/manage');

    $response->assertForbidden();
});

test('admin cannot see admin users in notification management', function () {
    $admin = User::factory()->create();
    $admin->assignRole($this->adminRole);

    $otherAdmin = User::factory()->create();
    $otherAdmin->assignRole($this->adminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($admin)->get('/admin/notifications/manage');

    $response->assertOk();
});

test('notification sending requires valid user ids', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $response = $this->actingAs($superadmin)
        ->post('/admin/notifications/send', [
            'user_ids' => [99999],
            'title' => 'Test',
            'message' => 'Test',
        ]);

    $response->assertSessionHasErrors('user_ids.0');
});

test('notification requires title and message', function () {
    $superadmin = User::factory()->create();
    $superadmin->assignRole($this->superadminRole);

    $user = User::factory()->create();
    $user->assignRole($this->userRole);

    $response = $this->actingAs($superadmin)
        ->post('/admin/notifications/send', [
            'user_ids' => [$user->id],
        ]);

    $response->assertSessionHasErrors(['title', 'message']);
});

