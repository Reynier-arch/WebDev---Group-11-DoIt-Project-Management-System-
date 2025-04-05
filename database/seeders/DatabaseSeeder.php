<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Diana',
            'email' => 'diana@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        Project::factory()
            ->count(10)
            ->hasTasks(10)
            ->create();
    }
}
