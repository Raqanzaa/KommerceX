import React from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const nav = useNavigate();
  async function doCheckout() {
    try {
      const res = await api.post("/checkout", {}); // extend with shipping data
      alert("Checkout success: " + res.data.transaction.id);
      nav("/");
    } catch (e) {
      alert(e.response?.data?.message || "Failed");
    }
  }
  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={doCheckout}>Confirm Purchase</button>
    </div>
  );
}
