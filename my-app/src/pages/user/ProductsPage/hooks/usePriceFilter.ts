import { useState, useCallback } from "react";

const DEFAULT_MAX_PRICE = 1_000_000;

export function usePriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);

  const handlePriceFilterChange = useCallback((min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  const resetPriceFilter = useCallback(() => {
    setMinPrice(0);
    setMaxPrice(DEFAULT_MAX_PRICE);
  }, []);

  return {
    minPrice,
    maxPrice,
    handlePriceFilterChange,
    resetPriceFilter,
    DEFAULT_MAX_PRICE,
  };
}
