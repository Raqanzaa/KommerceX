{{-- File ini hanya berisi HTML untuk modal --}}
<div id="product-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div class="flex justify-between items-center p-4 border-b">
            <h3 id="modal-title" class="text-xl font-semibold">Add New Product</h3>
            <button id="close-modal-button" class="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="p-6">
            <form id="product-form" enctype="multipart/form-data">
                <input type="hidden" id="product_id" name="product_id">
                {{-- ... semua input form Anda (name, price, image, dll) ... --}}
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Product Name</label>
                    <input class="shadow-sm appearance-none border rounded w-full py-2 px-3" id="name" name="name" type="text" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
                    <textarea class="shadow-sm appearance-none border rounded w-full py-2 px-3" id="description" name="description" rows="3"></textarea>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Price</label>
                        <input class="shadow-sm appearance-none border rounded w-full py-2 px-3" id="price" name="price" type="number" min="0" required>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="stock">Stock</label>
                        <input class="shadow-sm appearance-none border rounded w-full py-2 px-3" id="stock" name="stock" type="number" min="0" required>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="image">Product Image</label>
                    <input class="block w-full text-sm border rounded-lg cursor-pointer" id="image" name="image" type="file" accept="image/*">
                    <img id="preview-image" src="" alt="Image Preview" class="mt-2 h-24 hidden object-cover rounded">
                </div>
                <div class="mb-6">
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="form-checkbox h-5 w-5" id="is_active" name="is_active" value="1" checked>
                        <span class="ml-2 text-gray-700">Publish this product</span>
                    </label>
                </div>
                <div class="flex justify-end items-center gap-4 pt-4 border-t mt-4">
                    <button id="cancel-modal-button" type="button" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        <span id="modal-submit-text">Create Product</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>