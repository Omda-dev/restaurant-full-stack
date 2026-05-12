<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            SubcategorySeeder::class,
            MenuItemSeeder::class,
        ]);

        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('123456'),
                'role' => 'user',
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@test.com'],
            [
                'name' => 'Mr. Emad',
                'password' => Hash::make('123456'),
                'role' => 'admin',
            ]
        );
    }
}
