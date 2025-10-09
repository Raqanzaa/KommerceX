<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'isAdmin'])->only(['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $r)
    {
        $perPage = (int) $r->get('per_page', 12);
        $products = Product::where('is_active', true)->paginate($perPage);
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $r)
    {
        // pastikan user login dan role admin
        $user = $r->user();
        if (!$user || $user->role !== 'admin') {
            return response()->json([
                'message' => 'Anda tidak memiliki izin untuk menambahkan produk.'
            ], 403);
        }

        $r->validate([
            'name' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:5120'
        ]);

        $data = $r->only(['name', 'description', 'price', 'stock', 'is_active']);
        $data['slug'] = Str::slug($r->name) . '-' . Str::random(4);

        if ($r->hasFile('image')) {
            $path = $r->file('image')->store('products', 'public');
            $data['image'] = $path;
        }

        $product = Product::create($data);

        return response()->json([
            'message' => 'Produk berhasil ditambahkan.',
            'data' => $product
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        // --- Hanya admin yang boleh update ---
        $user = $request->user();
        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Tidak memiliki izin.'], 403);
        }

        // --- Validasi input ---
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|numeric|min:0',
            'is_active' => 'sometimes|boolean',
            'image' => 'nullable|image|max:5120', // Maks 5MB
        ]);

        // --- Cari produk berdasarkan ID ---
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan.'], 404);
        }

        // --- Ambil data yang akan diperbarui ---
        $data = $request->only(['name', 'description', 'price', 'stock', 'is_active']);

        // --- Jika ada file gambar baru, hapus gambar lama ---
        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        // --- Update produk ---
        $product->update($data);

        return response()->json([
            'message' => 'Produk berhasil diperbarui.',
            'data' => $product
        ]);
    }


    public function destroy(Request $request, $id)
    {
        // ... (logic otorisasi Anda, jika ada) ...
        $user = $request->user();
        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Tidak memiliki izin.'], 403);
        }

        // Cari produk secara manual
        $product = Product::find($id);

        // JIKA PRODUK TIDAK DITEMUKAN, beri respons 404
        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan atau sudah dihapus.'], 404);
        }

        // Jika ditemukan, lanjutkan proses hapus
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return response()->json(['message' => 'Produk berhasil dihapus.']);
    }
}
