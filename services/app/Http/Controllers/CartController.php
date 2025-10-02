<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $r)
    {
        $cart = CartItem::with('product')->where('user_id', $r->user()->id)->get();
        $total = $cart->sum(function ($i) {
            return $i->product->price * $i->quantity;
        });
        return response()->json(['items' => $cart, 'total' => $total]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $r)
    {
        $r->validate(['product_id' => 'required|exists:products,id', 'quantity' => 'required|integer|min:1']);
        $user = $r->user();
        $product = Product::findOrFail($r->product_id);
        $cart = CartItem::firstOrCreate(
            ['user_id' => $user->id, 'product_id' => $product->id],
            ['quantity' => 0]
        );
        $cart->quantity = $cart->quantity + $r->quantity;
        $cart->save();
        return response()->json($cart, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CartItem $cart_Item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CartItem $cart_Item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $r)
    {
        $r->validate(['id' => 'required|exists:cart_items,id', 'quantity' => 'required|integer|min:0']);
        $cart = CartItem::findOrFail($r->id);
        if ($r->quantity == 0) {
            $cart->delete();
            return response()->json(['message' => 'removed']);
        }
        $cart->quantity = $r->quantity;
        $cart->save();
        return response()->json($cart);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $r, $id)
    {
        $cart = CartItem::where('id', $id)->where('user_id', $r->user()->id)->firstOrFail();
        $cart->delete();
        return response()->json(['message' => 'deleted']);
    }
}
