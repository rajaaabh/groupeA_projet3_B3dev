<?php

namespace Tests\Unit;

use App\Models\Subscription;
use Tests\TestCase;

class SubscriptionTest extends TestCase
{
    public function test_abonnement_actif_retourne_vrai(): void
    {
        $subscription = new Subscription(['statut' => 'actif']);

        $this->assertTrue($subscription->isActif());
    }

    public function test_abonnement_inactif_retourne_faux(): void
    {
        $subscription = new Subscription(['statut' => 'inactif']);

        $this->assertFalse($subscription->isActif());
    }

    public function test_abonnement_expire_si_date_fin_passee(): void
    {
        $subscription = new Subscription([
            'date_fin' => now()->subDays(1),
        ]);

        $this->assertTrue($subscription->isExpire());
    }

    public function test_abonnement_non_expire_si_date_fin_future(): void
    {
        $subscription = new Subscription([
            'date_fin' => now()->addDays(10),
        ]);

        $this->assertFalse($subscription->isExpire());
    }
}
