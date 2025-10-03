import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Pages
import HomePage from "../pages/HomePage";
// import DashboardPage from "../pages/DashboardPage";

// // Import Layouts
// import DashboardLayout from "../features/dashboard/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rute utama untuk Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* Grup rute untuk Dashboard yang menggunakan layout */}
      {/* <Route path="/dashboard" element={<DashboardLayout />}> */}
        {/* Rute "index" untuk /dashboard */}
        {/* <Route index element={<DashboardPage />} /> */}
        {/* Contoh rute lain: <Route path="settings" element={<SettingsPage />} /> */}
      {/* </Route> */}
    </Routes>
  );
}
