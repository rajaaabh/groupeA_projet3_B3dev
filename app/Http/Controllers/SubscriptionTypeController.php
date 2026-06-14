<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionType;
use Illuminate\Http\Request;

class SubscriptionTypeController extends Controller
{
    public function index()
    {
        return response()->json(SubscriptionType::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_type'    => 'required|string|max:255',
            'duree_jours' => 'required|integer|min:1',
            'prix'        => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $type = SubscriptionType::create($validated);

        return response()->json($type, 201);
    }

    public function show(SubscriptionType $subscriptionType)
    {
        return response()->json($subscriptionType);
    }

    public function update(Request $request, SubscriptionType $subscriptionType)
    {
        $validated = $request->validate([
            'nom_type'    => 'sometimes|string|max:255',
            'duree_jours' => 'sometimes|integer|min:1',
            'prix'        => 'sometimes|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $subscriptionType->update($validated);

        return response()->json($subscriptionType);
    }

    public function destroy(SubscriptionType $subscriptionType)
    {
        $subscriptionType->delete();

        return response()->json(null, 204);
    }
}
