import React, { useEffect, useState } from "react";
import api from "../api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch();
  }, [page]);

  async function fetch() {
    const res = await api.get("/products", { params: { page, per_page: 12 } });
    setProducts(res.data.data);
    setMeta({
      current_page: res.data.current_page,
      last_page: res.data.last_page,
    });
  }

  return (
    <div>
      <h1>Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 12,
        }}
      >
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: 12 }}>
            <img
              src={`http://localhost:8000/storage/${p.image}`}
              alt={p.name}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>Rp {p.price}</p>
            <button
              onClick={async () => {
                await api.post("/cart/add", { product_id: p.id, quantity: 1 });
                alert("Added");
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          disabled={meta.current_page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span style={{ margin: "0 8px" }}>
          Page {meta.current_page} / {meta.last_page}
        </span>
        <button
          disabled={meta.current_page >= meta.last_page}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
