import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Pages
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../features/e-commerce/components/LoginPage";
import RegisterPage from "../features/e-commerce/components/RegisterPage";
// import CartPage from "../pages/CartPage";
// import DashboardPage from "../pages/DashboardPage";

// // Import Layouts
// import DashboardLayout from "../features/dashboard/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rute utama untuk Landing Page */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Grup rute untuk Dashboard yang menggunakan layout */}
      {/* <Route path="/dashboard" element={<DashboardLayout />}> */}
      {/* Rute "index" untuk /dashboard */}
      {/* <Route index element={<DashboardPage />} /> */}
      {/* Contoh rute lain: <Route path="settings" element={<SettingsPage />} /> */}
      {/* </Route> */}
    </Routes>
  );
}
