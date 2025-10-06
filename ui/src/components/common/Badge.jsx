import React from "react";

// Kamus untuk gaya berdasarkan ukuran
const sizeStyles = {
  xs: "px-2 py-0.5 text-xs",
  sm: "px-2.5 py-0.5 text-sm",
};

// Kamus untuk gaya berdasarkan warna
const colorStyles = {
  primary:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export default function Badge({
  children,
  className,
  size = "sm",
  color = "primary",
}) {
  const combinedClassName = `
    inline-flex items-center
    font-medium rounded-md
    ${sizeStyles[size]}
    ${colorStyles[color]}
    ${className || ""}
  `;

  return <span className={combinedClassName.trim()}>{children}</span>;
}
