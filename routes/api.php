<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SubscriptionTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());

    Route::apiResource('subscription-types', SubscriptionTypeController::class);
    Route::apiResource('subscriptions', SubscriptionController::class);
    Route::apiResource('notifications', NotificationController::class);
});
