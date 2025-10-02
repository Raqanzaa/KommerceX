// src/pages/ProductForm.jsx
import React, { useState } from "react";
import api from "../api";
export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  async function submit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("price", price);
    fd.append("stock", stock);
    if (image) fd.append("image", image);
    const res = await api.post("/products", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Created: " + res.data.id);
  }
  return (
    <form onSubmit={submit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
      />
      <input
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="stock"
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button>Create</button>
    </form>
  );
}
