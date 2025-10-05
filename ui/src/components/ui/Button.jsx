import React from "react";

// Kamus untuk gaya berdasarkan ukuran (size)
const sizeStyles = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
};

// Kamus untuk gaya berdasarkan warna (color)
const colorStyles = {
  primary:
    "bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
  secondary:
    "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-600",
  danger:
    "bg-red-600 hover:bg-red-700 text-white focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900",
};

export default function Button({
  children,
  className,
  size = "md",
  color = "primary",
  ...props
}) {
  // Gabungkan semua kelas menjadi satu
  const combinedClassName = `
    inline-flex items-center justify-center
    font-medium rounded-lg transition-colors
    focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeStyles[size]}
    ${colorStyles[color]}
    ${className || ""}
  `;

  return (
    <button className={combinedClassName.trim()} {...props}>
      {children}
    </button>
  );
}
