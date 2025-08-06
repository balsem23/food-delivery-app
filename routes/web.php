<?php
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'API is working']);
});
Route::get('/create-delivery-user', function () {
    $user = User::create([
        'name' => 'Delivery Guy',
        'email' => 'delivery@example.com',
        'password' => Hash::make('secret123'),
    ]);

    return "✅ Delivery user created: {$user->email}";
});
Route::get('/delete-all-users', function () {
    User::truncate();
    return "🗑️ All users deleted.";
});
Route::get('/debug-users', function () {
    return User::all();
});
Route::get('/check-password', function () {
    $user = User::where('email', 'delivery@example.com')->first();

    if (!$user) return '❌ No user found';

    return Hash::check('secret123', $user->password)
        ? '✅ Password is valid'
        : '❌ Password does NOT match';
});
