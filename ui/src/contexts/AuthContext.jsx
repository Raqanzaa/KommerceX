import React, { createContext, useState, useContext } from "react";

// 1. Buat Context
const AuthContext = createContext(null);

// 2. Buat Provider Component
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: true, // Dummy login
    user: {
      id: 1,
      name: "Ahmad Rizqi",
      email: "ahmad@example.com",
    },
  });

  // Fungsi login (simulasi)
  const login = (userData) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
    });
  };

  // Fungsi logout
  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  const value = { auth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}
