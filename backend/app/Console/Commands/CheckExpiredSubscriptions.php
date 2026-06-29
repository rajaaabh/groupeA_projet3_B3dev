<?php

namespace App\Console\Commands;

use App\Mail\SubscriptionExpiredMail;
use App\Models\Subscription;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class CheckExpiredSubscriptions extends Command
{
    protected $signature = 'subscriptions:check-expired';
    protected $description = 'Vérifie les abonnements expirés et envoie des notifications';

    public function handle()
    {
        $expiredSubscriptions = Subscription::where('statut', 'actif')
            ->where('date_fin', '<', now())
            ->with(['user', 'subscriptionType'])
            ->get();

        foreach ($expiredSubscriptions as $subscription) {
            // Mettre à jour le statut
            $subscription->update(['statut' => 'expiré']);

            // Envoyer l'email
            Mail::to($subscription->user->email)
                ->send(new SubscriptionExpiredMail($subscription));

            $this->info("Email envoyé à {$subscription->user->email}");
        }

        $this->info("Vérification terminée : {$expiredSubscriptions->count()} abonnement(s) expiré(s).");
    }
}
