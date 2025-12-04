<?php

use App\Models\ActivityLog;
use App\Models\User;

test('activity log can be created', function () {
    $user = User::factory()->create();
    
    $log = ActivityLog::create([
        'user_id' => $user->id,
        'action' => 'login',
        'description' => 'User logged in',
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Mozilla/5.0',
        'metadata' => ['key' => 'value'],
    ]);

    expect($log->action)->toBe('login');
    expect($log->description)->toBe('User logged in');
    expect($log->user_id)->toBe($user->id);
    expect($log->ip_address)->toBe('127.0.0.1');
});

test('activity log belongs to user', function () {
    $user = User::factory()->create();
    $log = ActivityLog::create([
        'user_id' => $user->id,
        'action' => 'logout',
        'description' => 'User logged out',
    ]);

    expect($log->user)->toBeInstanceOf(User::class);
    expect($log->user->id)->toBe($user->id);
});

test('activity log can be created without user', function () {
    $log = ActivityLog::create([
        'action' => 'system',
        'description' => 'System action',
    ]);

    expect($log->user_id)->toBeNull();
    expect($log->user)->toBeNull();
});

test('activity log metadata is cast to array', function () {
    $log = ActivityLog::create([
        'action' => 'test',
        'description' => 'Test',
        'metadata' => ['key' => 'value', 'nested' => ['data' => 'test']],
    ]);

    expect($log->metadata)->toBeArray();
    expect($log->metadata['key'])->toBe('value');
    expect($log->metadata['nested']['data'])->toBe('test');
});

test('activity log can store various actions', function () {
    $actions = ['login', 'logout', 'profile_updated', 'password_changed', 'user_created'];
    
    foreach ($actions as $action) {
        $log = ActivityLog::create([
            'action' => $action,
            'description' => "Action: {$action}",
        ]);
        
        expect($log->action)->toBe($action);
    }
});

