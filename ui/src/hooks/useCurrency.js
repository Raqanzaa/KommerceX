import { useMemo } from "react";

export const useCurrency = () => {
  const formatIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatIDRWithDecimal = (amount, decimalPlaces = 2) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(amount);
  };

  const parseIDR = (formattedString) => {
    return parseFloat(
      formattedString.replace(/[^\d,-]/g, "").replace(",", ".")
    );
  };

  return {
    formatIDR,
    formatIDRWithDecimal,
    parseIDR,
  };
};
