<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\categories;
use App\Http\Controllers\subcategories;
use Illuminate\Support\Facades\Route;



Route::get('/test-login', function () {
    return 'لو شايف الرسالة دي يبقى الراوت شغال';
})->middleware('guest');

Route::get('/categories', [Categories::class, 'index']);
Route::get('/subcategories', [subcategories::class, 'index']);
Route::get('/categories/{categoryId}/subcategories', [subcategories::class, 'getByCategory']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


    Route::get('/menu-items', [MenuItemController::class, 'index']);
    Route::get('/menu-items/{id}', [MenuItemController::class, 'show']);
    Route::get('/menu-structure', [Categories::class, 'withMenu']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::put('/bookings/{id}', [BookingController::class, 'update']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

    Route::post('/menu-items', [MenuItemController::class, 'store']);
    Route::put('/menu-items/{id}', [MenuItemController::class, 'update']);
    Route::delete('/menu-items/{id}', [MenuItemController::class, 'destroy']);

    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
});
