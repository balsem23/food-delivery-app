<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use App\Events\NewOrderCreated;

class OrderController extends Controller
{
    public function store(Request $request)
{
    try {
        $data = $request->validate([
            'customer_name' => 'required|string', // ✅ use customer_name instead of name
            'address' => 'required|string',
            'phone' => 'required|string',
            'items' => 'required|array',
            'total' => 'required|numeric',
        ]);

        // 👇 Rename customer_name to name if your DB expects 'name'
        $data['name'] = $data['customer_name'];
        unset($data['customer_name']);

        // Optional: set default status
        $data['status'] = 'pending';

        $order = Order::create($data);

        // Broadcast new order event
        event(new NewOrderCreated($order));

        Log::info('✅ Order successfully created and event broadcasted', $data);

        return response()->json([
            'message' => 'Order placed!',
            'order' => $order
        ], 201);
    } catch (\Throwable $e) {
        Log::error('❌ Order creation failed: ' . $e->getMessage());
        return response()->json([
            'error' => 'Server error',
            'details' => $e->getMessage()
        ], 500);
    }
}


    public function index()
    {
        // You can filter here if needed by status or user role
        $orders = Order::orderBy('created_at', 'desc')->get();

        return response()->json($orders);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,accepted,assigned,delivered,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        Log::info("✅ Order #{$order->id} status updated to {$order->status}");

        return response()->json(['message' => 'Order status updated']);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        Log::info("🗑️ Order #{$id} deleted by admin");

        return response()->json(['message' => 'Order deleted']);
    }
}
