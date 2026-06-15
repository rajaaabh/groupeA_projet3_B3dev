<?php

namespace Database\Seeders;

use App\Models\Notification;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        Notification::create([
            'user_id'     => 1,
            'message'     => 'Votre abonnement annuel est actif jusqu\'au 1er février 2027.',
            'type'        => 'abonnement',
            'date_envoi' => '2026-02-01 10:00:00',
            'lu'          => true,
        ]);

        Notification::create([
            'user_id'     => 2,
            'message'     => 'Votre abonnement trimestriel expire dans 7 jours.',
            'type'        => 'rappel',
            'date_envoi' => '2026-06-24 08:00:00',
            'lu'          => false,
        ]);

        Notification::create([
            'user_id'     => 1,
            'message'     => 'Offre spéciale : abonnement annuel à -20% pour les abonnés fidèles.',
            'type'        => 'promotion',
            'date_envoi' => '2026-06-10 12:00:00',
            'lu'          => false,
        ]);
    }
}
