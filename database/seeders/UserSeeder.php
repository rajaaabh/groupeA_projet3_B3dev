<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Alice Martin',
            'email'    => 'alice@example.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name'     => 'Bob Dupont',
            'email'    => 'bob@example.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@example.com',
            'password' => Hash::make('admin1234'),
        ]);
    }
}
