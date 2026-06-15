<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Subscription;
use App\Models\SubscriptionType;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function index()
    {
        return response()->json(
            Subscription::with(['user', 'subscriptionType'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type_id' => 'required|exists:subscription_types,id',
        ]);

        $type = SubscriptionType::findOrFail($validated['type_id']);

        $dateDebut = now();
        $dateFin = now()->copy()->addDays($type->duree_jours);

        $subscription = Subscription::create([
            'user_id'    => $request->user()->id,
            'type_id'    => $type->id,
            'date_debut' => $dateDebut,
            'date_fin'   => $dateFin,
            'statut'     => 'actif',
        ]);

       Notification::create([
            'user_id' => $request->user()->id,
            'subscription_id' => $subscription->id,
            'message' => "Votre abonnement {$type->nom_type} a été activé.",
            'type' => 'abonnement',
            'date_envoi' => now(),
            'lu' => false,
        ]);

        return response()->json([
            'message' => 'Abonnement créé avec succès',
            'subscription' => $subscription->load([
                'user',
                'subscriptionType'
            ])
        ], 201);
    }

    public function show(Subscription $subscription)
    {
        return response()->json(
            $subscription->load([
                'user',
                'subscriptionType'
            ])
        );
    }

    public function update(Request $request, Subscription $subscription)
    {
        $validated = $request->validate([
            'statut' => 'sometimes|string|in:actif,inactif,expiré',
        ]);

        $subscription->update($validated);

        return response()->json([
            'message' => 'Abonnement mis à jour',
            'subscription' => $subscription->load([
                'user',
                'subscriptionType'
            ])
        ]);
    }

    public function destroy(Subscription $subscription)
    {
        $subscription->delete();

        return response()->json([
            'message' => 'Abonnement supprimé'
        ]);
    }
}
