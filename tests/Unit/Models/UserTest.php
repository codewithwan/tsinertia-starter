<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

test('user can be created', function () {
    $user = User::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);

    expect($user->name)->toBe('Test User');
    expect($user->email)->toBe('test@example.com');
    expect($user->exists)->toBeTrue();
});

test('user can have roles', function () {
    $user = User::factory()->create();
    $role = Role::create(['name' => 'admin']);

    $user->assignRole($role);

    expect($user->hasRole('admin'))->toBeTrue();
    expect($user->roles)->toHaveCount(1);
});

test('user can have multiple roles', function () {
    $user = User::factory()->create();
    $adminRole = Role::create(['name' => 'admin']);
    $userRole = Role::create(['name' => 'user']);

    $user->assignRole([$adminRole, $userRole]);

    expect($user->hasRole('admin'))->toBeTrue();
    expect($user->hasRole('user'))->toBeTrue();
    expect($user->roles)->toHaveCount(2);
});

test('user can be created with email', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
    ]);

    expect($user->email)->toBe('test@example.com');
});

test('user password is hashed', function () {
    $user = User::factory()->create([
        'password' => 'plain-password',
    ]);

    expect($user->password)->not->toBe('plain-password');
    expect(\Illuminate\Support\Facades\Hash::check('plain-password', $user->password))->toBeTrue();
});

test('user can have avatar', function () {
    $user = User::factory()->create([
        'avatar' => '/storage/avatars/test.jpg',
    ]);

    expect($user->avatar)->toBe('/storage/avatars/test.jpg');
});

test('user can have otp code and expiration', function () {
    $user = User::factory()->create([
        'otp_code' => '123456',
        'otp_expires_at' => now()->addMinutes(10),
    ]);

    expect($user->otp_code)->toBe('123456');
    expect($user->otp_expires_at)->toBeInstanceOf(\Illuminate\Support\Carbon::class);
});

test('user can have oauth provider', function () {
    $user = User::factory()->create([
        'provider' => 'google',
        'provider_id' => 'google_123',
    ]);

    expect($user->provider)->toBe('google');
    expect($user->provider_id)->toBe('google_123');
});

test('user email verified at is cast to datetime', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    expect($user->email_verified_at)->toBeInstanceOf(\Illuminate\Support\Carbon::class);
});

