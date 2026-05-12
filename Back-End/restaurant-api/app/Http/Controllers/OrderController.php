<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'notes' => 'nullable|string',
            'payment_method' => 'required|in:cod,card',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        $order = DB::transaction(function () use ($validated, $user) {
            $menuItemIds = collect($validated['items'])->pluck('menu_item_id')->all();
            $menuItems = MenuItem::whereIn('id', $menuItemIds)->get()->keyBy('id');

            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => 0,
                'status' => 'pending',
                'address' => $validated['address'],
                'phone' => $validated['phone'],
                'notes' => $validated['notes'] ?? null,
                'payment_method' => $validated['payment_method'],
            ]);

            $totalPrice = 0;

            foreach ($validated['items'] as $item) {
                $menuItem = $menuItems->get($item['menu_item_id']);
                $quantity = (int) $item['quantity'];
                $price = (float) $menuItem->price;

                $order->orderItems()->create([
                    'menu_item_id' => $menuItem->id,
                    'quantity' => $quantity,
                    'price' => $price,
                ]);

                $totalPrice += $price * $quantity;
            }

            $order->total_price = $totalPrice;
            $order->save();

            return $order->load(['user', 'orderItems.menuItem']);
        });

        return response()->json($order, 201);
    }

    public function index()
    {
        $user = Auth::user();

        $orders = $user->orders()
            ->with(['orderItems.menuItem'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function adminIndex()
    {
        $user = Auth::user();

        if (! $user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $orders = Order::with(['user', 'orderItems.menuItem'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function updateStatus(Request $request, $id)
    {
        $user = Auth::user();

        if (! $user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,in_progress,delivered,rejected',
        ]);

        $order = Order::with(['user', 'orderItems.menuItem'])->findOrFail($id);
        $order->status = $validated['status'];
        $order->save();

        return response()->json($order);
    }
}
