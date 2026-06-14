<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
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
            'user_id'    => 'required|exists:users,id',
            'type_id'    => 'required|exists:subscription_types,id',
            'date_debut' => 'required|date',
            'date_fin'   => 'required|date|after:date_debut',
            'statut'     => 'required|string|in:actif,inactif,expiré',
        ]);

        $subscription = Subscription::create($validated);

        return response()->json(
            $subscription->load(['user', 'subscriptionType']),
            201
        );
    }

    public function show(Subscription $subscription)
    {
        return response()->json(
            $subscription->load(['user', 'subscriptionType'])
        );
    }

    public function update(Request $request, Subscription $subscription)
    {
        $validated = $request->validate([
            'type_id'    => 'sometimes|exists:subscription_types,id',
            'date_debut' => 'sometimes|date',
            'date_fin'   => 'sometimes|date|after:date_debut',
            'statut'     => 'sometimes|string|in:actif,inactif,expiré',
        ]);

        $subscription->update($validated);

        return response()->json(
            $subscription->load(['user', 'subscriptionType'])
        );
    }

    public function destroy(Subscription $subscription)
    {
        $subscription->delete();

        return response()->json(null, 204);
    }
}
