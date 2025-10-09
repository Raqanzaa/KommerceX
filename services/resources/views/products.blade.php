@extends('layouts.app')

@section('content')
    <h1 class="text-3xl font-bold mb-6">Our Products</h1>
    <div id="products-container" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <p>Loading products...</p>
    </div>

    <!-- Product Modal (Create/Update) -->
    <div id="product-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div class="flex justify-between items-center p-4 border-b">
                <h3 id="modal-title" class="text-xl font-semibold">Add New Product</h3>
                <button id="close-modal-button" class="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="p-6">
                <form id="create-product-form" enctype="multipart/form-data">
                    <input type="hidden" id="product_id" name="product_id">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Product Name</label>
                        <input class="shadow-sm appearance-none border rounded w-full py-2 px-3" id="name"
                            name="name" type="text" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
                        <textarea class="shadow-sm appearance-none border rounded w-full py-2 px-3" id="description" name="description"
                            rows="3"></textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Price</label>
                            <input class="shadow-sm appearance-none border rounded w-full py-2 px-3" id="price"
                                name="price" type="number" min="0" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="stock">Stock</label>
                            <input class="shadow-sm appearance-none border rounded w-full py-2 px-3" id="stock"
                                name="stock" type="number" min="0" required>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="image">Product Image</label>
                        <input class="block w-full text-sm border rounded-lg cursor-pointer" id="image" name="image"
                            type="file" accept="image/*">
                        <img id="preview-image" src="" alt="" class="mt-2 h-24 hidden object-cover rounded">
                    </div>
                    <div class="mb-6">
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="form-checkbox h-5 w-5" id="is_active" name="is_active"
                                value="1" checked>
                            <span class="ml-2 text-gray-700">Publish this product</span>
                        </label>
                    </div>
                    <p id="modal-message" class="text-center my-2"></p>
                    <div class="flex justify-end items-center gap-4 pt-4 border-t mt-4">
                        <button id="cancel-modal-button" type="button"
                            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit"
                            class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                            <span id="modal-submit-text">Create Product</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const modal = document.getElementById('product-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const cancelModalButton = document.getElementById('cancel-modal-button');
    const productForm = document.getElementById('create-product-form');
    const modalMessage = document.getElementById('modal-message');
    const modalTitle = document.getElementById('modal-title');
    const modalSubmitText = document.getElementById('modal-submit-text');
    const previewImage = document.getElementById('preview-image');
    const user = JSON.parse(localStorage.getItem('user_data'));

    let isEditMode = false;

    // Modal functions
    function openModal(edit = false, product = null) {
        isEditMode = edit;
        modalTitle.textContent = edit ? 'Edit Product' : 'Add New Product';
        modalSubmitText.textContent = edit ? 'Update Product' : 'Create Product';
        modal.classList.remove('hidden');
        modalMessage.textContent = '';
        modalMessage.className = 'text-center my-2';

        if (edit && product) {
            document.getElementById('product_id').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('description').value = product.description || '';
            document.getElementById('price').value = product.price;
            document.getElementById('stock').value = product.stock;
            document.getElementById('is_active').checked = product.is_active == 1;
            previewImage.src = product.image ? '/storage/' + product.image : '';
            previewImage.classList.toggle('hidden', !product.image);
        } else {
            productForm.reset();
            document.getElementById('product_id').value = '';
            previewImage.src = '';
            previewImage.classList.add('hidden');
        }
    }

    function closeModal() {
        modal.classList.add('hidden');
        productForm.reset();
        previewImage.src = '';
        previewImage.classList.add('hidden');
        modalMessage.textContent = '';
        modalMessage.className = 'text-center my-2';
        isEditMode = false;
    }

    // Modal events
    closeModalButton.addEventListener('click', closeModal);
    cancelModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) closeModal();
    });

    // Image preview
    document.getElementById('image').addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                previewImage.src = ev.target.result;
                previewImage.classList.remove('hidden');
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            previewImage.src = '';
            previewImage.classList.add('hidden');
        }
    });

    // Create/Update Product
    productForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(productForm);
        if (!formData.has('is_active')) formData.set('is_active', '0');
        modalMessage.textContent = isEditMode ? 'Updating...' : 'Submitting...';
        modalMessage.className = 'text-center my-2 text-gray-500';

        let url = '/api/products';
        let method = 'POST';
        if (isEditMode) {
            const id = document.getElementById('product_id').value;
            url = `/api/products/${id}`;
            method = 'POST'; // For Laravel, use POST with _method=PUT
            formData.append('_method', 'PUT');
        }

        try {
            const token = localStorage.getItem('api_token');
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: formData
            });
            const data = await response.json();

            if (response.ok) {
                modalMessage.textContent = isEditMode ? 'Product updated successfully!' : 'Product added successfully!';
                modalMessage.className = 'text-center my-2 text-green-500';
                setTimeout(() => {
                    closeModal();
                    loadProducts();
                }, 1200);
            } else {
                modalMessage.textContent = data.message || 'An error occurred.';
                modalMessage.className = 'text-center my-2 text-red-500';
            }
        } catch (error) {
            modalMessage.textContent = 'Submission failed. Please try again.';
            modalMessage.className = 'text-center my-2 text-red-500';
        }
    });

    // Load Products
    async function loadProducts() {
        const container = document.getElementById('products-container');
        container.innerHTML = `<p>Loading products...</p>`;
        let productsHtml = '';

        if (user && user.role === 'admin') {
            productsHtml += `
                <button id="add-product-button" class="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200 min-h-[280px]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="mt-2 font-semibold">Add New Product</span>
                </button>
            `;
        }

        try {
            const response = await fetch('/api/products');
            const result = await response.json();
            const products = result.data;

            if (products.length === 0 && !productsHtml) {
                container.innerHTML = '<p>No products found.</p>';
                return;
            }

            products.forEach(product => {
                productsHtml += `
                <div class="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    ${user && user.role === 'admin' ? `
                    <div class="absolute top-2 right-2 flex space-x-2 z-10">
                        <button data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}'
                            class="edit-btn p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <button data-id="${product.id}"
                            class="delete-btn p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    ` : ''}
                    <img src="${product.image ? '/storage/' + product.image : 'https://via.placeholder.com/300'}"
                        alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-4 flex flex-col flex-grow">
                        <h3 class="text-lg font-semibold">${product.name}</h3>
                        <p class="text-gray-600 mt-1">Rp ${parseInt(product.price).toLocaleString('id-ID')}</p>
                        <p class="text-sm text-gray-500 mt-2">Stock: ${product.stock}</p>
                        <div class="mt-auto pt-4">
                            <div class="flex items-center">
                                <input type="number" id="quantity-${product.id}"
                                    class="w-20 border rounded px-2 py-1 text-center"
                                    value="1" min="1" max="${product.stock}">
                                <button onclick="addToCart(${product.id})"
                                    class="ml-2 flex-1 px-4 py-2 bg-blue-500 text-white text-sm font-bold uppercase rounded hover:bg-blue-700 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });

            container.innerHTML = productsHtml;

            // Add event listeners for admin actions
            if (user && user.role === 'admin') {
                const addBtn = document.getElementById('add-product-button');
                if (addBtn) addBtn.addEventListener('click', () => openModal(false));

                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const product = JSON.parse(this.getAttribute('data-product').replace(/&#39;/g, "'"));
                        openModal(true, product);
                    });
                });

                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        deleteProduct(id);
                    });
                });
            }
        } catch (error) {
            container.innerHTML = '<p>Failed to load products. Please try again later.</p>';
            console.error('Error fetching products:', error);
        }
    }

    // Delete Product
    async function deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const token = localStorage.getItem('api_token');
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                alert('Product deleted successfully!');
                loadProducts();
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete product.');
            }
        } catch (error) {
            alert('An error occurred while deleting.');
        }
    }

    // Initial load
    loadProducts();
});

// Add to Cart function (global)
async function addToCart(productId) {
    const token = localStorage.getItem('api_token');
    if (!token) {
        alert('Please login to add items to your cart.');
        window.location.href = '/login';
        return;
    }
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value, 10);
    if (isNaN(quantity) || quantity < 1) {
        alert('Please enter a valid quantity.');
        return;
    }
    try {
        const response = await fetch('/api/cart/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity
            })
        });
        if (response.ok) {
            alert('Product added to cart!');
        } else {
            const data = await response.json();
            alert('Failed to add product: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        alert('An error occurred.');
    }
}
</script>
@endpush
