"use client";

import { useState, useCallback, useMemo } from "react";
import type { CategoryData } from "../../../types/categoryTypes";
import type { ProductData } from "../../../types/productTypes";

export type ViewMode = "grid" | "list";
export type SortOption =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "quantity-asc"
  | "quantity-desc";

export interface FilterState {
  search: string;
  categoryId: string;
  brand: string;
  availability: string;
  priceMin: string;
  priceMax: string;
  sortBy: SortOption;
}

const defaultFilters: FilterState = {
  search: "",
  categoryId: "",
  brand: "",
  availability: "",
  priceMin: "",
  priceMax: "",
  sortBy: "newest",
};

export function useFilterdProducts(products: ProductData[], categories: CategoryData[]) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    const {
      search,
      categoryId,
      brand,
      availability,
      priceMin,
      priceMax,
      sortBy,
    } = filters;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name ?? "").toLowerCase().includes(q) ||
          (p.brand ?? "").toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      );
    }
    if (categoryId) result = result.filter((p) => (p.categoryId ?? p.categoryName) === categoryId);
    if (brand) result = result.filter((p) => p.brand === brand);

    const priceMinNum = parseFloat(priceMin);
    const priceMaxNum = parseFloat(priceMax);
    if (priceMinNum > 0) result = result.filter((p) => (p.price ?? 0) >= priceMinNum);
    if (priceMaxNum > 0) result = result.filter((p) => (p.price ?? 0) <= priceMaxNum);

    if (availability) {
      if (availability === "available") result = result.filter((p) => p.available !== false);
      if (availability === "unavailable") result = result.filter((p) => p.available === false);
      if (availability === "lowstock") result = result.filter((p) => (p.quantity ?? 0) > 0 && (p.quantity ?? 0) <= 10);
      if (availability === "outofstock") result = result.filter((p) => (p.quantity ?? 0) === 0);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
        case "oldest":
          return new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime();
        case "name-asc":
          return (a.name ?? "").localeCompare(b.name ?? "");
        case "name-desc":
          return (b.name ?? "").localeCompare(a.name ?? "");
        case "price-asc":
          return (a.price ?? 0) - (b.price ?? 0);
        case "price-desc":
          return (b.price ?? 0) - (a.price ?? 0);
        case "quantity-asc":
          return (a.quantity ?? 0) - (b.quantity ?? 0);
        case "quantity-desc":
          return (b.quantity ?? 0) - (a.quantity ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [products, filters]);

  const uniqueBrands = useMemo(
    () => [...new Set(products.map((p) => p.brand).filter(Boolean))].sort() as string[],
    [products]
  );

  const getCategoryName = (product: ProductData) => {
    const id = product.categoryId;
    if (id) {
      const cat = categories.find((c) => c.id === id);
      if (cat) return cat.name;
    }
    return product.categoryName ?? "Uncategorized";
  };

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter((v) => v !== "").length;
  }, [filters]);

  return {
    filteredProducts,
    filtersVisible,
    setFiltersVisible,
    viewMode,
    setViewMode,
    uniqueBrands,
    getCategoryName,
    filters,
    updateFilter,
    clearAllFilters,
    activeFilterCount,
  };
}
