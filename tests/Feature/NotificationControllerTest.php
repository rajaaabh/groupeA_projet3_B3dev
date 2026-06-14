<?php

namespace Tests\Feature;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class NotificationControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'user_id' => $this->user->id,
            'message' => 'Votre abonnement expire bientôt.',
            'type'    => 'rappel',
            'lu'      => false,
        ], $overrides);
    }

    public function test_index_retourne_toutes_les_notifications(): void
    {
        Sanctum::actingAs($this->user);
        Notification::create($this->payload());

        $this->getJson('/api/notifications')
            ->assertOk()
            ->assertJsonCount(1);
    }

    public function test_store_cree_une_notification(): void
    {
        Sanctum::actingAs($this->user);

        $this->postJson('/api/notifications', $this->payload())
            ->assertCreated()
            ->assertJsonFragment(['type' => 'rappel']);

        $this->assertDatabaseHas('notifications', ['user_id' => $this->user->id]);
    }

    public function test_store_accepte_user_id_null(): void
    {
        Sanctum::actingAs($this->user);

        $this->postJson('/api/notifications', $this->payload(['user_id' => null]))
            ->assertCreated();
    }

    public function test_store_echoue_sans_message(): void
    {
        Sanctum::actingAs($this->user);

        $this->postJson('/api/notifications', ['type' => 'rappel'])
            ->assertUnprocessable();
    }

    public function test_show_retourne_une_notification(): void
    {
        Sanctum::actingAs($this->user);
        $notif = Notification::create($this->payload());

        $this->getJson("/api/notifications/{$notif->id}")
            ->assertOk()
            ->assertJsonFragment(['message' => 'Votre abonnement expire bientôt.']);
    }

    public function test_update_marque_comme_lu(): void
    {
        Sanctum::actingAs($this->user);
        $notif = Notification::create($this->payload());

        $this->putJson("/api/notifications/{$notif->id}", ['lu' => true])
            ->assertOk()
            ->assertJsonFragment(['lu' => true]);
    }

    public function test_destroy_supprime_une_notification(): void
    {
        Sanctum::actingAs($this->user);
        $notif = Notification::create($this->payload());

        $this->deleteJson("/api/notifications/{$notif->id}")->assertNoContent();
        $this->assertDatabaseMissing('notifications', ['id' => $notif->id]);
    }

    public function test_non_authentifie_retourne_401(): void
    {
        $this->getJson('/api/notifications')->assertUnauthorized();
    }
}
