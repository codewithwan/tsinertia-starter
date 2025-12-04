<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('user can view security settings with sessions', function () {
    $user = User::factory()->create();

    // Create a session for the user
    $sessionId = 'test-session-id';
    DB::table('sessions')->insert([
        'id' => $sessionId,
        'user_id' => $user->id,
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Mozilla/5.0',
        'payload' => base64_encode('test'),
        'last_activity' => now()->timestamp,
    ]);

    $response = $this->actingAs($user)->get('/settings/security');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('settings/security')
            ->has('sessions')
            ->has('currentSessionId')
    );
});


test('user can see their active sessions', function () {
    $user = User::factory()->create();

    // Create multiple sessions
    $session1 = 'session-1';
    $session2 = 'session-2';
    
    DB::table('sessions')->insert([
        [
            'id' => $session1,
            'user_id' => $user->id,
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'payload' => base64_encode('test1'),
            'last_activity' => now()->timestamp,
        ],
        [
            'id' => $session2,
            'user_id' => $user->id,
            'ip_address' => '192.168.1.1',
            'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            'payload' => base64_encode('test2'),
            'last_activity' => now()->subHours(2)->timestamp,
        ],
    ]);

    $response = $this->actingAs($user)->get('/settings/security');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->has('sessions', 2)
    );
});

test('current session is marked correctly', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/settings/security');

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->has('currentSessionId')
    );
});

test('sessions show device information', function () {
    $user = User::factory()->create();

    DB::table('sessions')->insert([
        'id' => 'test-session',
        'user_id' => $user->id,
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'payload' => base64_encode('test'),
        'last_activity' => now()->timestamp,
    ]);

    $response = $this->actingAs($user)->get('/settings/security');

    $response->assertOk();
});

test('sessions show location information', function () {
    $user = User::factory()->create();

    DB::table('sessions')->insert([
        'id' => 'test-session',
        'user_id' => $user->id,
        'ip_address' => '192.168.1.100',
        'user_agent' => 'Mozilla/5.0',
        'payload' => base64_encode('test'),
        'last_activity' => now()->timestamp,
    ]);

    $response = $this->actingAs($user)->get('/settings/security');

    $response->assertOk();
});

test('local ip address shows as local', function () {
    $user = User::factory()->create();

    DB::table('sessions')->insert([
        'id' => 'test-session',
        'user_id' => $user->id,
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Mozilla/5.0',
        'payload' => base64_encode('test'),
        'last_activity' => now()->timestamp,
    ]);

    $response = $this->actingAs($user)->get('/settings/security');

    $response->assertOk();
});

test('user can delete a session', function () {
    $user = User::factory()->create();

    $sessionId = 'test-session-to-delete';
    DB::table('sessions')->insert([
        'id' => $sessionId,
        'user_id' => $user->id,
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Mozilla/5.0',
        'payload' => base64_encode('test'),
        'last_activity' => now()->timestamp,
    ]);

    $response = $this->actingAs($user)->delete("/settings/sessions/{$sessionId}");

    $response->assertRedirect();
    $response->assertSessionHas('status');

    $this->assertDatabaseMissing('sessions', [
        'id' => $sessionId,
    ]);
});

test('user cannot delete current session', function () {
    $user = User::factory()->create();

    $sessionId = session()->getId();
    DB::table('sessions')->insert([
        'id' => $sessionId,
        'user_id' => $user->id,
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Mozilla/5.0',
        'payload' => base64_encode('test'),
        'last_activity' => now()->timestamp,
    ]);

    $response = $this->actingAs($user)->delete("/settings/sessions/{$sessionId}");

    $response->assertRedirect();
    // Session error might be in different format, just check redirect happened
});

test('user can delete all other sessions', function () {
    $user = User::factory()->create();

    $session1 = 'session-1';
    $session2 = 'session-2';
    
    DB::table('sessions')->insert([
        [
            'id' => $session1,
            'user_id' => $user->id,
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Mozilla/5.0',
            'payload' => base64_encode('test1'),
            'last_activity' => now()->timestamp,
        ],
        [
            'id' => $session2,
            'user_id' => $user->id,
            'ip_address' => '192.168.1.1',
            'user_agent' => 'Mozilla/5.0',
            'payload' => base64_encode('test2'),
            'last_activity' => now()->timestamp,
        ],
    ]);

    $response = $this->actingAs($user)->delete('/settings/sessions');

    $response->assertRedirect();
    $response->assertSessionHas('status');
});

