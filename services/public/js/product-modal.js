// Mengelola semua hal terkait modal: membuka, menutup, mengisi data, dan submit form.

// Ekspor fungsi agar bisa diimpor di file lain
export function initModal() {
    const modal = document.getElementById("product-modal");
    const form = document.getElementById("product-form");
    const previewImage = document.getElementById("preview-image");

    // Event listener untuk tombol close dan cancel
    document
        .getElementById("close-modal-button")
        .addEventListener("click", closeModal);
    document
        .getElementById("cancel-modal-button")
        .addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Event listener untuk preview gambar
    document.getElementById("image").addEventListener("change", function (e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                previewImage.src = ev.target.result;
                previewImage.classList.remove("hidden");
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Event listener untuk submit form (Create/Update)
    form.addEventListener("submit", handleFormSubmit);
}

export function openModal(isEdit = false, product = null) {
    const modal = document.getElementById("product-modal");
    const form = document.getElementById("product-form");
    const modalTitle = document.getElementById("modal-title");
    const submitText = document.getElementById("modal-submit-text");
    const previewImage = document.getElementById("preview-image");

    form.reset();
    document.getElementById("product_id").value = "";
    previewImage.src = "";
    previewImage.classList.add("hidden");

    if (isEdit && product) {
        modalTitle.textContent = "Edit Product";
        submitText.textContent = "Update Product";
        document.getElementById("product_id").value = product.id;
        document.getElementById("name").value = product.name;
        document.getElementById("description").value =
            product.description || "";
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;
        document.getElementById("is_active").checked = product.is_active == 1;
        if (product.image) {
            previewImage.src = "/storage/" + product.image;
            previewImage.classList.remove("hidden");
        }
    } else {
        modalTitle.textContent = "Add New Product";
        submitText.textContent = "Create Product";
    }
    modal.classList.remove("hidden");
}

export function closeModal() {
    document.getElementById("product-modal").classList.add("hidden");
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const productId = formData.get("product_id");

    if (!formData.has("is_active")) formData.set("is_active", "0");

    let url = "/api/products";
    let method = "POST";

    if (productId) {
        url = `/api/products/${productId}`;
        formData.append("_method", "PUT");
    }

    try {
        const token = localStorage.getItem("api_token");
        const response = await fetch(url, {
            method: "POST", // Form dengan file selalu POST
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            closeModal();
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: data.message,
                timer: 1500,
                showConfirmButton: false,
            });
            // Kirim event custom untuk memberitahu halaman agar me-reload produk
            document.dispatchEvent(new CustomEvent("products-updated"));
        } else {
            Swal.fire(
                "Error!",
                data.message || "Something went wrong.",
                "error"
            );
        }
    } catch (error) {
        Swal.fire("Error!", "Could not connect to the server.", "error");
    }
}
