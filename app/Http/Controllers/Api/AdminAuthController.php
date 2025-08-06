<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        // ✅ Block unless from allowed IPs
        $allowedIps = ['127.0.0.1', '::1']; // Add your real IPs for production
        if (!in_array($request->ip(), $allowedIps)) {
            return response()->json(['error' => 'Unauthorized IP'], 403);
        }

        // ✅ Require a shared secret key
        if ($request->secret !== 'super_secret_key') {
            return response()->json(['error' => 'Invalid secret'], 403);
        }

        // ✅ Validate login input
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // ✅ Check credentials
        $admin = Admin::where('email', $data['email'])->first();

        if (! $admin || ! Hash::check($data['password'], $admin->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // ✅ Generate Sanctum token
        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
        ]);
    }
}
