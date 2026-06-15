<?php

namespace Tests\Feature;

use App\Models\SubscriptionType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SubscriptionTypeControllerTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsUser(): void
    {
        Sanctum::actingAs(User::factory()->create());
    }

    public function test_index_retourne_tous_les_types(): void
    {
        $this->actingAsUser();
        SubscriptionType::create(['nom_type' => 'Mensuel', 'duree_jours' => 30, 'prix' => 9.99]);

        $response = $this->getJson('/api/subscription-types');

        $response->assertOk()->assertJsonCount(1);
    }

    public function test_store_cree_un_type(): void
    {
        $this->actingAsUser();

        $response = $this->postJson('/api/subscription-types', [
            'nom_type'    => 'Annuel',
            'duree_jours' => 365,
            'prix'        => 89.99,
            'description' => 'Offre annuelle',
        ]);

        $response->assertCreated()->assertJsonFragment(['nom_type' => 'Annuel']);
        $this->assertDatabaseHas('subscription_types', ['nom_type' => 'Annuel']);
    }

    public function test_store_echoue_sans_champs_requis(): void
    {
        $this->actingAsUser();

        $this->postJson('/api/subscription-types', [])->assertUnprocessable();
    }

    public function test_show_retourne_un_type(): void
    {
        $this->actingAsUser();
        $type = SubscriptionType::create(['nom_type' => 'Mensuel', 'duree_jours' => 30, 'prix' => 9.99]);

        $this->getJson("/api/subscription-types/{$type->id}")
            ->assertOk()
            ->assertJsonFragment(['nom_type' => 'Mensuel']);
    }

    public function test_update_modifie_un_type(): void
    {
        $this->actingAsUser();
        $type = SubscriptionType::create(['nom_type' => 'Mensuel', 'duree_jours' => 30, 'prix' => 9.99]);

        $this->putJson("/api/subscription-types/{$type->id}", ['prix' => 12.99])
            ->assertOk()
            ->assertJsonFragment(['prix' => 12.99]);
    }

    public function test_destroy_supprime_un_type(): void
    {
        $this->actingAsUser();
        $type = SubscriptionType::create(['nom_type' => 'Mensuel', 'duree_jours' => 30, 'prix' => 9.99]);

        $this->deleteJson("/api/subscription-types/{$type->id}")->assertNoContent();
        $this->assertDatabaseMissing('subscription_types', ['id' => $type->id]);
    }

    public function test_non_authentifie_retourne_401(): void
    {
        $this->getJson('/api/subscription-types')->assertUnauthorized();
    }
}
