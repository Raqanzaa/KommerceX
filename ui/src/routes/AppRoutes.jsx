import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Spinner from "../components/common/Spinner";

// Lazy loading pages
const HomePage = lazy(() => import("../pages/HomePage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const AdminDashboardPage = lazy(() => import("../pages/AdminDashboardPage"));
// const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const AppRoutes = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    }
  >
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Route>

      {/* Not Found */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  </Suspense>
);

export default AppRoutes;
