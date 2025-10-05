import axiosInstance from "./axiosInstance";

export const registerUser = (userData) =>
  axiosInstance.post("/register", userData);
export const loginUser = (credentials) =>
  axiosInstance.post("/login", credentials);
export const logoutUser = () => axiosInstance.post("/logout");
