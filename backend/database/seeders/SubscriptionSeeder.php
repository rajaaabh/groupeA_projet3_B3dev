<?php

namespace Database\Seeders;

use App\Models\Subscription;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    public function run(): void
    {
        // Alice : ancien mensuel expiré, puis annuel actif
        Subscription::create([
            'user_id'    => 1,
            'type_id'    => 1,
            'date_debut' => '2026-01-01',
            'date_fin'   => '2026-01-31',
            'statut'     => 'expiré',
        ]);

        Subscription::create([
            'user_id'    => 1,
            'type_id'    => 3,
            'date_debut' => '2026-02-01',
            'date_fin'   => '2027-02-01',
            'statut'     => 'actif',
        ]);

        // Bob : trimestriel actif
        Subscription::create([
            'user_id'    => 2,
            'type_id'    => 2,
            'date_debut' => '2026-04-01',
            'date_fin'   => '2026-07-01',
            'statut'     => 'actif',
        ]);
    }
}
