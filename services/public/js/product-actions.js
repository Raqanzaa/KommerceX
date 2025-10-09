// Berisi fungsi-fungsi untuk aksi pada kartu produk.

export async function deleteProduct(id) {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
        try {
            const token = localStorage.getItem("api_token");
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                Swal.fire(
                    "Deleted!",
                    "The product has been deleted.",
                    "success"
                );
                document.dispatchEvent(new CustomEvent("products-updated"));
            } else {
                const data = await response.json();
                Swal.fire(
                    "Failed!",
                    data.message || "Could not delete the product.",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("Error!", "Could not connect to the server.", "error");
        }
    }
}

export async function addToCart(productId) {
    const token = localStorage.getItem("api_token");
    if (!token) {
        Swal.fire(
            "Oops...",
            "Please login to add items to your cart.",
            "warning"
        );
        return;
    }
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value, 10);
    if (isNaN(quantity) || quantity < 1) {
        Swal.fire(
            "Invalid Quantity",
            "Please enter a number greater than 0.",
            "error"
        );
        return;
    }

    try {
        const response = await fetch("/api/cart/create", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ product_id: productId, quantity: quantity }),
        });
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Added!",
                text: "Product has been added to your cart.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            const data = await response.json();
            Swal.fire(
                "Error!",
                data.message || "Failed to add product.",
                "error"
            );
        }
    } catch (error) {
        Swal.fire("Error!", "Could not connect to the server.", "error");
    }
}
