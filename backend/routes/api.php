<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SubscriptionTypeController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Routes publiques
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Routes protégées par Sanctum
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('subscription-types', SubscriptionTypeController::class);

    Route::apiResource('subscriptions', SubscriptionController::class);

    Route::apiResource('notifications', NotificationController::class);

    Route::get('/users', [UserController::class, 'index']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});
