import axiosInstance from "./axiosInstance";

/**
 * Fetches a paginated list of products.
 */
export const getProducts = (page = 1) =>
  axiosInstance.get(`/products?page=${page}`);

/**
 * Fetches a single product by its slug or ID.
 * Your backend route is `/products/{product}`, which works with this.
 */
export const getProductBySlug = (slug) =>
  axiosInstance.get(`/products/${slug}`);

/**
 * Creates a new product.
 * Expects FormData for potential file uploads.
 */
export const createProduct = (productData) =>
  axiosInstance.post("/products", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/**
 * Updates an existing product.
 * NOTE: Your backend route is `PUT /products/{product}`, but HTML forms and FormData
 * do not properly support PUT requests for file uploads. The standard Laravel practice
 * is to use a POST request and spoof the method. This function sends a POST request,
 * which is what the AdminDashboardPage prepares. You may need to change your backend
 * route from `Route::put(...)` to `Route::post(...)` for updates to work correctly.
 */
export const updateProduct = (id, productData) =>
  axiosInstance.post(`/products/${id}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/**
 * Deletes a product by its ID.
 */
export const deleteProduct = (id) => axiosInstance.delete(`/products/${id}`);
