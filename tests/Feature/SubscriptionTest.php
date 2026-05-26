<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SubscriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_subscription()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/subscriptions', [
            'type' => 'mois',
            'start_date' => '2026-05-26',
            'end_date' => '2026-06-26',
            'status' => 'actif'
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'message',
                     'subscription'
                 ]);
    }

    public function test_guest_cannot_create_subscription()
    {
        $response = $this->postJson('/api/subscriptions', [
            'type' => 'mois',
            'start_date' => '2026-05-26',
            'end_date' => '2026-06-26',
            'status' => 'actif'
        ]);

        $response->assertStatus(401);
    }
}
