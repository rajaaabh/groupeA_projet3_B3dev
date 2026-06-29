<?php

namespace Tests\Feature;

use App\Models\Subscription;
use App\Models\SubscriptionType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SubscriptionControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private SubscriptionType $type;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->type = SubscriptionType::create([
            'nom_type' => 'Mensuel',
            'duree_jours' => 30,
            'prix' => 9.99,
            'description' => 'Abonnement mensuel',
        ]);
    }

    public function test_index_retourne_toutes_les_souscriptions(): void
    {
        Sanctum::actingAs($this->user);

        Subscription::create([
            'user_id' => $this->user->id,
            'type_id' => $this->type->id,
            'date_debut' => now(),
            'date_fin' => now()->addDays(30),
            'statut' => 'actif',
        ]);

        $this->getJson('/api/subscriptions')
            ->assertOk()
            ->assertJsonCount(1);
    }

    public function test_store_cree_un_abonnement(): void
    {
        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/subscriptions', [
            'type_id' => $this->type->id,
        ]);

        $response
            ->assertCreated()
            ->assertJsonFragment([
                'message' => 'Abonnement créé avec succès'
            ]);

        $this->assertDatabaseHas('subscriptions', [
            'user_id' => $this->user->id,
            'type_id' => $this->type->id,
            'statut' => 'actif',
        ]);
    }

    public function test_creation_abonnement_genere_une_notification(): void
    {
        Sanctum::actingAs($this->user);

        $this->postJson('/api/subscriptions', [
            'type_id' => $this->type->id,
        ]);

        $this->assertDatabaseHas('notifications', [
            'user_id' => $this->user->id,
            'type' => 'email',
        ]);
    }

    public function test_store_echoue_sans_type_id(): void
    {
        Sanctum::actingAs($this->user);

        $this->postJson('/api/subscriptions', [])
            ->assertUnprocessable();
    }

    public function test_show_retourne_une_souscription(): void
    {
        Sanctum::actingAs($this->user);

        $subscription = Subscription::create([
            'user_id' => $this->user->id,
            'type_id' => $this->type->id,
            'date_debut' => now(),
            'date_fin' => now()->addDays(30),
            'statut' => 'actif',
        ]);

        $this->getJson("/api/subscriptions/{$subscription->id}")
            ->assertOk()
            ->assertJsonFragment([
                'statut' => 'actif'
            ]);
    }

    public function test_update_modifie_le_statut(): void
    {
        Sanctum::actingAs($this->user);

        $subscription = Subscription::create([
            'user_id' => $this->user->id,
            'type_id' => $this->type->id,
            'date_debut' => now(),
            'date_fin' => now()->addDays(30),
            'statut' => 'actif',
        ]);

        $this->putJson("/api/subscriptions/{$subscription->id}", [
            'statut' => 'inactif',
        ])
            ->assertOk()
            ->assertJsonFragment([
                'statut' => 'inactif'
            ]);
    }

    public function test_destroy_supprime_une_souscription(): void
    {
        Sanctum::actingAs($this->user);

        $subscription = Subscription::create([
            'user_id' => $this->user->id,
            'type_id' => $this->type->id,
            'date_debut' => now(),
            'date_fin' => now()->addDays(30),
            'statut' => 'actif',
        ]);

        $this->deleteJson("/api/subscriptions/{$subscription->id}")
            ->assertOk();

        $this->assertDatabaseMissing('subscriptions', [
            'id' => $subscription->id,
        ]);
    }

    public function test_non_authentifie_retourne_401(): void
    {
        $this->getJson('/api/subscriptions')
            ->assertUnauthorized();
    }
}
