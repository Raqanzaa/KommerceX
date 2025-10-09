<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/create', [CartController::class, 'create']);
    Route::post('/cart/update', [CartController::class, 'update']);
    Route::delete('/cart/destroy/{id}', [CartController::class, 'destroy']);

    // Checkout
    Route::post('/checkout', [CheckoutController::class, 'checkout']);
});

Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});
