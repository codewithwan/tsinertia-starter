<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class TestUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create roles
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        // Create 20 users with 'user' role
        for ($i = 1; $i <= 20; $i++) {
            $user = User::factory()->create([
                'name' => 'Test User ' . $i,
                'email' => 'user' . $i . '@test.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
            $user->assignRole($userRole);
        }

        // Create 5 admins with 'admin' role
        for ($i = 1; $i <= 5; $i++) {
            $admin = User::factory()->create([
                'name' => 'Test Admin ' . $i,
                'email' => 'admin' . $i . '@test.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
            $admin->assignRole($adminRole);
        }

        $this->command->info('Created 20 test users and 5 test admins successfully!');
    }
}

