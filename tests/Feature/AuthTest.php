<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Rajaa',
            'email' => 'rajaa@test.com',
            'password' => '123456'
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'message',
                     'token',
                     'user'
                 ]);
    }

    public function test_user_can_login()
    {
        $this->postJson('/api/register', [
            'name' => 'Rajaa',
            'email' => 'rajaa@test.com',
            'password' => '123456'
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'rajaa@test.com',
            'password' => '123456'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'token',
                     'user'
                 ]);
    }
}
