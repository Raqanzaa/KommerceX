import axiosInstance from "./axiosInstance";

export const getCart = () => axiosInstance.get("/cart");
export const addToCart = (item) => axiosInstance.post("/cart/create", item);
export const updateCartItem = (item) => axiosInstance.post("/cart/update", item);
export const removeFromCart = (id) => axiosInstance.delete(`/cart/destroy/${id}`);
export const checkout = () => axiosInstance.post("/checkout");
