<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        return response()->json(
            Notification::with('user')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'    => 'nullable|exists:users,id',
            'message'    => 'required|string',
            'type'       => 'required|string|max:255',
            'date_denvoi'=> 'nullable|date',
            'lu'         => 'boolean',
        ]);

        $notification = Notification::create($validated);

        return response()->json($notification->load('user'), 201);
    }

    public function show(Notification $notification)
    {
        return response()->json($notification->load('user'));
    }

    public function update(Request $request, Notification $notification)
    {
        $validated = $request->validate([
            'message' => 'sometimes|string',
            'type'    => 'sometimes|string|max:255',
            'lu'      => 'boolean',
        ]);

        $notification->update($validated);

        return response()->json($notification);
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json(null, 204);
    }
}
