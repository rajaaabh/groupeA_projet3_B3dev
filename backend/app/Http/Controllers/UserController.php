<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name'                  => 'sometimes|required|string|max:255',
            'password'              => 'sometimes|nullable|min:6|confirmed',
            'password_confirmation' => 'sometimes|nullable',
        ]);

        $user = $request->user();

        if ($request->filled('name')) {
            $user->name = $request->name;
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'Profil mis à jour',
            'user'    => $user,
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé']);
    }
}
