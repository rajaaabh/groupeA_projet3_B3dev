<?php

namespace Database\Seeders;

use App\Models\SubscriptionType;
use Illuminate\Database\Seeder;

class SubscriptionTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            [
                'nom_type'    => 'Mensuel',
                'duree_jours' => 30,
                'prix'        => 9.99,
                'description' => 'Abonnement mensuel renouvelable chaque mois.',
            ],
            [
                'nom_type'    => 'Trimestriel',
                'duree_jours' => 90,
                'prix'        => 24.99,
                'description' => 'Abonnement trimestriel avec une réduction de 17%.',
            ],
            [
                'nom_type'    => 'Annuel',
                'duree_jours' => 365,
                'prix'        => 89.99,
                'description' => 'Abonnement annuel, la meilleure offre avec 25% de réduction.',
            ],
        ];

        foreach ($types as $type) {
            SubscriptionType::create($type);
        }
    }
}
