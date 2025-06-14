<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Step 1: Create Super Admin Role (if it doesn't exist)
        $role = Role::firstOrCreate(
            ['name' => 'super-admin'],
        );

        // Step 2: Create Super Admin User
        $user = User::updateOrCreate(
            ['email' => 'superadmin@example.com'],
            [

                'role_id' => $role->id,
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'password' => Hash::make('password123'), // Default password
                'mobile_number' => '9999999999',
                'status' => 1,
                'created_by' => null,
                'updated_by' => null,
            ]
        );

        echo "✅ Super Admin seeded successfully with email: superadmin@example.com\n";
    }
}