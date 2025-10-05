import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../../../components/ui/Button";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Arahkan ke halaman login setelah logout
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white bg-opacity-80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            TokoKita
          </span>
        </Link>
        <div className="flex items-center space-x-2 md:order-2">
          {auth.isAuthenticated ? (
            <>
              <span className="hidden text-sm text-gray-700 dark:text-gray-300 sm:inline">
                Halo, {auth.user?.name}!
              </span>
              <Button onClick={handleLogout} color="secondary" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button color="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button color="primary" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
