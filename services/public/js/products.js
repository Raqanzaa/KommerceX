// File utama yang mengatur halaman produk, memuat data, dan menghubungkan semua aksi.

import { initModal, openModal } from "./product-modal.js";
import { deleteProduct, addToCart } from "./product-actions.js";

// --- Inisialisasi Saat Halaman Dimuat ---
document.addEventListener("DOMContentLoaded", () => {
    initModal();
    loadProducts();

    // Dengarkan event custom. Jika ada update, reload daftar produk.
    document.addEventListener("products-updated", loadProducts);

    // Event Delegation untuk tombol-tombol pada kartu produk
    const container = document.getElementById("products-container");
    container.addEventListener("click", (e) => {
        const editBtn = e.target.closest(".edit-btn");
        const deleteBtn = e.target.closest(".delete-btn");
        const cartBtn = e.target.closest(".cart-btn");

        if (editBtn) {
            const product = JSON.parse(editBtn.dataset.product);
            openModal(true, product);
        }
        if (deleteBtn) {
            deleteProduct(deleteBtn.dataset.id);
        }
        if (cartBtn) {
            addToCart(cartBtn.dataset.id);
        }
    });
});

// --- Fungsi untuk Memuat dan Merender Produk ---
async function loadProducts() {
    const container = document.getElementById("products-container");
    const user = JSON.parse(localStorage.getItem("user_data"));
    container.innerHTML = "<p>Loading products...</p>";
    let productsHtml = "";

    if (user && user.role === "admin") {
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
        const response = await fetch("/api/products");
        const result = await response.json();
        const products = result.data;

        if (products.length === 0 && !productsHtml) {
            container.innerHTML = "<p>No products found.</p>";
            return;
        }

        products.forEach((product) => {
            productsHtml += `
                <div class="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    ${
                        user && user.role === "admin"
                            ? `
                    <div class="absolute top-2 right-2 flex space-x-2 z-10">
                        <button data-product='${JSON.stringify(product).replace(
                            /'/g,
                            "&#39;"
                        )}'
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
                    `
                            : ""
                    }
                    <img src="${
                        product.image
                            ? "/storage/" + product.image
                            : "https://via.placeholder.com/300"
                    }"
                        alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-4 flex flex-col flex-grow">
                        <h3 class="text-lg font-semibold">${product.name}</h3>
                        <p class="text-gray-600 mt-1">Rp ${parseInt(
                            product.price
                        ).toLocaleString("id-ID")}</p>
                        <p class="text-sm text-gray-500 mt-2">Stock: ${
                            product.stock
                        }</p>
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

        if (user && user.role === "admin") {
            document
                .getElementById("add-product-button")
                .addEventListener("click", () => openModal(false));
        }
    } catch (error) {
        container.innerHTML = "<p>Failed to load products.</p>";
        console.error("Error fetching products:", error);
    }
}
