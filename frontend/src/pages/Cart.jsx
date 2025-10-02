import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const nav = useNavigate();

  async function load() {
    const res = await api.get("/cart");
    setCart(res.data);
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.map((i) => (
        <div key={i.id}>
          <img
            src={`http://localhost:8000/storage/${i.product.image}`}
            style={{ width: 60 }}
          />
          {i.product.name} - {i.quantity} x Rp {i.product.price}
          <button
            onClick={async () => {
              await api.post("/cart/update", {
                id: i.id,
                quantity: i.quantity + 1,
              });
              load();
            }}
          >
            +
          </button>
          <button
            onClick={async () => {
              await api.post("/cart/update", {
                id: i.id,
                quantity: i.quantity - 1,
              });
              load();
            }}
          >
            -
          </button>
          <button
            onClick={async () => {
              await api.delete("/cart/remove/" + i.id);
              load();
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <h3>Total: Rp {cart.total}</h3>
      <button onClick={() => nav("/checkout")}>Checkout</button>
    </div>
  );
}
