<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

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

        public function test_user_cannot_login_with_wrong_password()
    {
        $this->postJson('/api/register', [
            'name' => 'Rajaa',
            'email' => 'rajaa@test.com',
            'password' => '123456'
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'rajaa@test.com',
            'password' => 'mauvaismotdepasse'
        ]);

        $response->assertStatus(401);
    }
    
    public function test_user_can_logout()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/logout');

        $response->assertStatus(200);
    }
}
