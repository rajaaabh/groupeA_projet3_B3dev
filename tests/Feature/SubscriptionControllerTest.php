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
            'nom_type'    => 'Mensuel',
            'duree_jours' => 30,
            'prix'        => 9.99,
        ]);
    }

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'user_id'    => $this->user->id,
            'type_id'    => $this->type->id,
            'date_debut' => '2026-01-01',
            'date_fin'   => '2026-01-31',
            'statut'     => 'actif',
        ], $overrides);
    }

    public function test_index_retourne_toutes_les_souscriptions(): void
    {
        Sanctum::actingAs($this->user);
        Subscription::create($this->payload());

        $this->getJson('/api/subscriptions')
            ->assertOk()
            ->assertJsonCount(1);
    }

    public function test_store_cree_une_souscription(): void
    {
        Sanctum::actingAs($this->user);

        $this->postJson('/api/subscriptions', $this->payload())
            ->assertCreated()
            ->assertJsonFragment(['statut' => 'actif']);

        $this->assertDatabaseHas('subscriptions', ['user_id' => $this->user->id]);
    }

    public function test_store_echoue_avec_date_fin_avant_debut(): void
    {
        Sanctum::actingAs($this->user);

        $this->postJson('/api/subscriptions', $this->payload([
            'date_debut' => '2026-02-01',
            'date_fin'   => '2026-01-01',
        ]))->assertUnprocessable();
    }

    public function test_store_echoue_avec_statut_invalide(): void
    {
        Sanctum::actingAs($this->user);

        $this->postJson('/api/subscriptions', $this->payload([
            'statut' => 'invalide',
        ]))->assertUnprocessable();
    }

    public function test_show_retourne_une_souscription(): void
    {
        Sanctum::actingAs($this->user);
        $sub = Subscription::create($this->payload());

        $this->getJson("/api/subscriptions/{$sub->id}")
            ->assertOk()
            ->assertJsonFragment(['statut' => 'actif']);
    }

    public function test_update_modifie_une_souscription(): void
    {
        Sanctum::actingAs($this->user);
        $sub = Subscription::create($this->payload());

        $this->putJson("/api/subscriptions/{$sub->id}", ['statut' => 'inactif'])
            ->assertOk()
            ->assertJsonFragment(['statut' => 'inactif']);
    }

    public function test_destroy_supprime_une_souscription(): void
    {
        Sanctum::actingAs($this->user);
        $sub = Subscription::create($this->payload());

        $this->deleteJson("/api/subscriptions/{$sub->id}")->assertNoContent();
        $this->assertDatabaseMissing('subscriptions', ['id' => $sub->id]);
    }

    public function test_non_authentifie_retourne_401(): void
    {
        $this->getJson('/api/subscriptions')->assertUnauthorized();
    }
}
