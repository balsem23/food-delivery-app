<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Models\User;

// 🔐 Admin login route
Route::post('/superadmin-login-438x', [AdminAuthController::class, 'login']);

// 🛒 Order routes
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);
Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

// 👷‍♂️ Create Delivery Guy (temporary route for testing)
Route::get('/create-delivery-guy', function () {
    $user = User::create([
        'name' => 'Delivery Guy',
        'email' => 'delivery@example.com',
        'password' => Hash::make('secret123'),
        'role' => 'delivery',
    ]);

    return response()->json([
        'message' => '✅ Delivery guy created',
        'email' => $user->email,
        'password' => 'secret123',
        'role' => $user->role,
    ]);
});

// 🚚 Delivery Guy Login
Route::post('/delivery-login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    if ($user->role !== 'delivery') {
        return response()->json(['message' => 'Unauthorized role'], 403);
    }

    $token = $user->createToken('delivery-token')->plainTextToken;

    return response()->json(['token' => $token]);
});
Route::get('/delete-delivery-guy', function () {
    $deleted = User::where('email', 'delivery@example.com')->delete();

    return response()->json([
        'message' => $deleted ? '🗑️ Delivery guy deleted' : '❌ Delivery guy not found',
    ]);
});

