<?php

use Illuminate\Support\Facades\Route;

// Halaman utama (menampilkan produk)
Route::get('/', function () {
    return view('products');
})->name('products');

// Halaman login
Route::get('/login', function () {
    return view('login');
})->name('login');

// Halaman register
Route::get('/register', function () {
    return view('register');
});

// Halaman keranjang
Route::get('/cart', function () {
    return view('cart');
})->name('cart');

// Halaman detail produk (opsional, tapi baik untuk ada)
Route::get('/product/{slug}', function ($slug) {
    // Di sini kita hanya menampilkan view, data akan di-fetch dengan JS
    return view('product-detail', ['slug' => $slug]);
});

Route::get('/admin/products/create', function () {
    return view('admin.create-product');
})->name('admin.products.create');