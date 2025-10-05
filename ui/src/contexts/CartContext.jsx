import { createContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as cartApi from "../api/cartService";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
    enabled: isAuthenticated, // Only fetch cart if user is logged in
    select: (data) => data.data,
  });

  const addToCartMutation = useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: () => {
      toast.success("Item added to cart!");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Could not add item."),
  });

  const updateCartMutation = useMutation({
    mutationFn: cartApi.updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Could not update item."),
  });

  const removeFromCartMutation = useMutation({
    mutationFn: cartApi.removeFromCart,
    onSuccess: () => {
      toast.success("Item removed from cart.");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Could not remove item."),
  });

  const checkoutMutation = useMutation({
    mutationFn: cartApi.checkout,
    onSuccess: () => {
      toast.success("Checkout successful! Thank you for your order.");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Checkout failed."),
  });

  const value = {
    cart,
    isLoading,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    checkout: checkoutMutation.mutate,
    isCheckingOut: checkoutMutation.isPending,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
