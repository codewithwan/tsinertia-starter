<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

/**
 * Base TestCase for Pest PHP tests
 * 
 * @method \Illuminate\Testing\TestResponse get(string $uri, array $headers = [])
 * @method \Illuminate\Testing\TestResponse post(string $uri, array $data = [], array $headers = [])
 * @method \Illuminate\Testing\TestResponse put(string $uri, array $data = [], array $headers = [])
 * @method \Illuminate\Testing\TestResponse patch(string $uri, array $data = [], array $headers = [])
 * @method \Illuminate\Testing\TestResponse delete(string $uri, array $data = [], array $headers = [])
 * @method \Illuminate\Testing\TestResponse actingAs(\Illuminate\Contracts\Auth\Authenticatable $user, string $driver = null)
 * @method void assertDatabaseHas(string $table, array $data, string $connection = null)
 * @method void assertDatabaseMissing(string $table, array $data, string $connection = null)
 * @method void assertAuthenticated(string $guard = null)
 * @method void assertGuest(string $guard = null)
 * @method void assertRedirect(string $uri = null)
 * @method void assertOk()
 * @method void assertForbidden()
 * @method void assertStatus(int $status)
 * @method void assertSessionHas(string|array $key, mixed $value = null)
 * @method void assertSessionHasErrors(array|string $keys = [], mixed $format = null, string $errorBag = 'default')
 * @method void assertSessionHasNoErrors()
 * @method \Inertia\Testing\AssertableInertia assertInertia(callable $callback = null)
 * @property \Spatie\Permission\Models\Role $superadminRole
 * @property \Spatie\Permission\Models\Role $adminRole
 * @property \Spatie\Permission\Models\Role $userRole
 */
abstract class TestCase extends BaseTestCase
{
    //
}
