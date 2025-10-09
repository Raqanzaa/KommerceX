@extends('layouts.app')

@section('content')
    <h1 class="text-3xl font-bold mb-6">Our Products</h1>
    
    <div id="products-container" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <p>Loading products...</p>
    </div>

    {{-- Memuat HTML modal dari file partial --}}
    @include('product_modal')
@endsection

@push('scripts')
    {{-- Memuat file JavaScript utama untuk halaman ini --}}
    <script src="{{ asset('js/products.js') }}" type="module"></script>
@endpush