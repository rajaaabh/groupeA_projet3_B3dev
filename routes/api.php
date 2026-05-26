<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/subscriptions', [SubscriptionController::class, 'index']);

    Route::post('/subscriptions', [SubscriptionController::class, 'store']);

    Route::get('/subscriptions/{id}', [SubscriptionController::class, 'show']);

    Route::put('/subscriptions/{id}', [SubscriptionController::class, 'update']);

    Route::delete('/subscriptions/{id}', [SubscriptionController::class, 'destroy']);

});
