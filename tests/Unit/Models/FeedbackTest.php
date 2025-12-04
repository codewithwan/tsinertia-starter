<?php

use App\Models\Feedback;
use App\Models\User;

test('feedback can be created', function () {
    $user = User::factory()->create();
    
    $feedback = Feedback::create([
        'user_id' => $user->id,
        'type' => 'bug',
        'subject' => 'Test Subject',
        'message' => 'Test message',
        'rating' => 5,
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Mozilla/5.0',
        'metadata' => ['url' => 'https://example.com'],
    ]);

    expect($feedback->type)->toBe('bug');
    expect($feedback->subject)->toBe('Test Subject');
    expect($feedback->message)->toBe('Test message');
    expect($feedback->rating)->toBe(5);
    expect($feedback->user_id)->toBe($user->id);
});

test('feedback belongs to user', function () {
    $user = User::factory()->create();
    $feedback = Feedback::create([
        'user_id' => $user->id,
        'type' => 'feature',
        'message' => 'Test message',
    ]);

    expect($feedback->user)->toBeInstanceOf(User::class);
    expect($feedback->user->id)->toBe($user->id);
});

test('feedback can be created without user', function () {
    $feedback = Feedback::create([
        'type' => 'improvement',
        'message' => 'Anonymous feedback',
    ]);

    expect($feedback->user_id)->toBeNull();
    expect($feedback->user)->toBeNull();
});

test('feedback rating is cast to integer', function () {
    $feedback = Feedback::create([
        'type' => 'rating',
        'message' => 'Test',
        'rating' => '5',
    ]);

    expect($feedback->rating)->toBe(5);
    expect($feedback->rating)->toBeInt();
});

test('feedback metadata is cast to array', function () {
    $feedback = Feedback::create([
        'type' => 'other',
        'message' => 'Test',
        'metadata' => ['key' => 'value'],
    ]);

    expect($feedback->metadata)->toBeArray();
    expect($feedback->metadata['key'])->toBe('value');
});

test('feedback can have all types', function () {
    $types = ['bug', 'feature', 'improvement', 'rating', 'other'];
    
    foreach ($types as $type) {
        $feedback = Feedback::create([
            'type' => $type,
            'message' => "Test {$type}",
        ]);
        
        expect($feedback->type)->toBe($type);
    }
});

