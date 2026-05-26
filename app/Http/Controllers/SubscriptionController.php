<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    // Voir tous les abonnements du user connecté
    public function index(Request $request)
    {
        return $request->user()->subscriptions;
    }

    // Créer abonnement
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'status' => 'required'
        ]);

        $subscription = Subscription::create([
            'user_id' => $request->user()->id,
            'type' => $request->type,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Abonnement créé avec succès',
            'subscription' => $subscription
        ], 201);
    }

    // Afficher un abonnement
    public function show($id)
    {
        return Subscription::findOrFail($id);
    }

    // Modifier abonnement
    public function update(Request $request, $id)
    {
        $subscription = Subscription::findOrFail($id);

        $subscription->update($request->all());

        return response()->json([
            'message' => 'Abonnement modifié',
            'subscription' => $subscription
        ]);
    }

    // Supprimer abonnement
    public function destroy($id)
    {
        $subscription = Subscription::findOrFail($id);

        $subscription->delete();

        return response()->json([
            'message' => 'Abonnement supprimé'
        ]);
    }
}
