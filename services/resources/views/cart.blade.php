@extends('layouts.app')

@section('content')
    <h1 class="text-3xl font-bold mb-6">Your Shopping Cart</h1>
    <div class="bg-white shadow-md rounded-lg p-6">
        <div id="cart-items-container">
            <p>Loading your cart...</p>
        </div>
        <div id="cart-summary" class="pt-4 text-right">
             </div>
    </div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Cek jika user belum login
        if (!localStorage.getItem('api_token')) {
            window.location.href = '/login?redirect=cart';
            return;
        }
        loadCart();
    });

    async function loadCart() {
        const container = document.getElementById('cart-items-container');
        const summary = document.getElementById('cart-summary');
        container.innerHTML = '<p>Loading your cart...</p>';
        summary.innerHTML = '';

        try {
            const response = await fetchWithAuth('/api/cart');
            const data = await response.json();

            if (data.items.length === 0) {
                container.innerHTML = '<p>Your cart is empty.</p>';
                return;
            }

            let itemsHtml = `
                <table class="w-full text-left">
                    <thead>
                        <tr>
                            <th class="py-2">Product</th>
                            <th class="py-2">Price</th>
                            <th class="py-2">Quantity</th>
                            <th class="py-2">Subtotal</th>
                            <th class="py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.items.forEach(item => {
                const subtotal = item.quantity * item.product.price;
                itemsHtml += `
                    <tr class="border-b">
                        <td class="py-4">${item.product.name}</td>
                        <td>Rp ${parseInt(item.product.price).toLocaleString('id-ID')}</td>
                        <td>
                            <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" class="w-16 border rounded text-center">
                        </td>
                        <td>Rp ${subtotal.toLocaleString('id-ID')}</td>
                        <td>
                            <button onclick="removeItem(${item.id})" class="text-red-500 hover:text-red-700">Remove</button>
                        </td>
                    </tr>
                `;
            });

            itemsHtml += `</tbody></table>`;
            container.innerHTML = itemsHtml;

            summary.innerHTML = `
                <h2 class="text-xl font-bold">Total: Rp ${data.total.toLocaleString('id-ID')}</h2>
                <button onclick="checkout()" class="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700">Checkout</button>
            `;

        } catch (error) {
            container.innerHTML = '<p>Failed to load cart.</p>';
            console.error('Error loading cart:', error);
        }
    }

    async function updateQuantity(cartItemId, quantity) {
        if (quantity < 0) return; // Kuantitas tidak boleh negatif
        
        try {
            await fetchWithAuth('/api/cart/update', {
                method: 'POST', // Sesuaikan dengan route API Anda, di contoh API Anda menggunakan POST
                body: JSON.stringify({ id: cartItemId, quantity: quantity })
            });
            loadCart(); // Muat ulang keranjang untuk menampilkan perubahan
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity.');
        }
    }

    async function removeItem(cartItemId) {
        if (!confirm('Are you sure you want to remove this item?')) return;
        
        try {
             // Di API Anda, `destroy` adalah DELETE, jadi kita gunakan method DELETE
             await fetchWithAuth(`/api/cart/destroy/${cartItemId}`, {
                method: 'DELETE'
            });
            loadCart();
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item.');
        }
    }

    async function checkout() {
        if (!confirm('Proceed to checkout?')) return;

        try {
            const response = await fetchWithAuth('/api/checkout', {
                method: 'POST'
            });
            
            if (response.ok) {
                const data = await response.json();
                alert('Checkout successful! Transaction ID: ' + data.transaction.id);
                window.location.href = '/';
            } else {
                const data = await response.json();
                alert('Checkout failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred during checkout.');
        }
    }
</script>
@endpush