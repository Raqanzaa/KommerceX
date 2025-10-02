import React, { useState } from "react";
import api from "../api"; // Pastikan path ini benar
import { useNavigate } from "react-router-dom";

export default function Register() {
  // 1. TAMBAHKAN STATE untuk 'name' dan 'passwordConfirmation'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // State untuk menangani error validasi dari backend
  const [errors, setErrors] = useState({});
  // State untuk loading, agar tombol tidak diklik berkali-kali
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true); // Mulai loading
    setErrors({}); // Bersihkan error sebelumnya

    try {
      // 2. KIRIM PAYLOAD LENGKAP sesuai kebutuhan backend Laravel
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      // Simpan token ke localStorage
      localStorage.setItem("token", res.data.token);
      // Arahkan ke halaman utama/dashboard
      nav("/");
    } catch (error) {
      // 3. TAMBAHKAN ERROR HANDLING
      if (error.response && error.response.status === 422) {
        // Tangkap error validasi dari Laravel (status 422)
        setErrors(error.response.data.errors);
      } else {
        // Tangkap error lainnya (misal: server down)
        setErrors({ general: ["An unexpected error occurred."] });
        console.error("Registration error:", error);
      }
    } finally {
      setLoading(false); // Selesai loading, baik berhasil maupun gagal
    }
  }

  return (
    <form onSubmit={submit}>
      {/* Tampilkan error umum jika ada */}
      {errors.general && <p style={{ color: "red" }}>{errors.general[0]}</p>}

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      {/* Tampilkan error spesifik untuk field 'name' */}
      {errors.name && <p style={{ color: "red" }}>{errors.name[0]}</p>}

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email[0]}</p>}

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      {errors.password && <p style={{ color: "red" }}>{errors.password[0]}</p>}

      {/* 4. TAMBAHKAN INPUT untuk konfirmasi password */}
      <input
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder="Confirm Password"
        type="password"
      />

      {/* 5. Nonaktifkan tombol saat loading */}
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
