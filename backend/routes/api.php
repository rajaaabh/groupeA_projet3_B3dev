<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SubscriptionTypeController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;

/*
|--------------------------------------------------------------------------
| Routes publiques
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Routes protégées par Sanctum (tous les utilisateurs connectés)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    Route::get('subscription-types', [SubscriptionTypeController::class, 'index']);
    Route::get('subscription-types/{subscriptionType}', [SubscriptionTypeController::class, 'show']);

    Route::apiResource('subscriptions', SubscriptionController::class);

    Route::apiResource('notifications', NotificationController::class);

    /*
    |--------------------------------------------------------------------------
    | Routes Admin uniquement
    |--------------------------------------------------------------------------
    */
    Route::middleware(AdminMiddleware::class)->group(function () {


        Route::post('subscription-types', [SubscriptionTypeController::class, 'store']);
        Route::put('subscription-types/{subscriptionType}', [SubscriptionTypeController::class, 'update']);
        Route::delete('subscription-types/{subscriptionType}', [SubscriptionTypeController::class, 'destroy']);


        Route::get('/users', [UserController::class, 'index']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });
});
