<?php

/** @phpstan-ignore-file */
use App\Models\User;
use Spatie\Permission\Models\Role;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/dashboard')->assertOk();
});

test('superadmin sees superadmin dashboard', function () {
    $role = Role::create(['name' => 'superadmin']);
    $user = User::factory()->create();
    $user->assignRole($role);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('superadmin/dashboard'));
});

test('admin sees admin dashboard', function () {
    $role = Role::create(['name' => 'admin']);
    $user = User::factory()->create();
    $user->assignRole($role);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('admin/dashboard'));
});

test('regular user sees user dashboard', function () {
    $role = Role::create(['name' => 'user']);
    $user = User::factory()->create();
    $user->assignRole($role);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('user/dashboard'));
});

test('superadmin can access superadmin dashboard route', function () {
    $role = Role::create(['name' => 'superadmin']);
    $user = User::factory()->create();
    $user->assignRole($role);

    $response = $this->actingAs($user)->get('/superadmin/dashboard');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('superadmin/dashboard'));
});

test('admin can access admin dashboard route', function () {
    $role = Role::create(['name' => 'admin']);
    $user = User::factory()->create();
    $user->assignRole($role);

    $response = $this->actingAs($user)->get('/admin/dashboard');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('admin/dashboard'));
});

test('user can access user dashboard route', function () {
    $role = Role::create(['name' => 'user']);
    $user = User::factory()->create();
    $user->assignRole($role);

    $response = $this->actingAs($user)->get('/user/dashboard');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('user/dashboard'));
});

test('non-superadmin cannot access superadmin dashboard route', function () {
    $role = Role::create(['name' => 'admin']);
    $user = User::factory()->create();
    $user->assignRole($role);

    $response = $this->actingAs($user)->get('/superadmin/dashboard');

    $response->assertForbidden();
});

test('non-admin cannot access admin dashboard route', function () {
    $role = Role::create(['name' => 'user']);
    $user = User::factory()->create();
    $user->assignRole($role);

    $response = $this->actingAs($user)->get('/admin/dashboard');

    $response->assertForbidden();
});

