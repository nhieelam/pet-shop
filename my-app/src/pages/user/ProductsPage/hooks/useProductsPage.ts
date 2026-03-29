"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CategoryData } from "@/types/categoryTypes";
import type { ProductData } from "@/types/productTypes";
import * as categoryService from "@/services/categoryService";
import * as productService from "@/services/productService";
import { addCartItem } from "@/services/cartService";
import { useAuth } from "@/context/authContext";
import type { CustomerData } from "@/types/customerTypes";
import type { CartResponse } from "@/types/cartTypes";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10_000_000;
const DEFAULT_SORT = "price-asc";

export function useProductsPage(itemsPerPage = 12) {
  const { customer, setCustomer } = useAuth();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string >("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  function mergeCartIntoCustomer(
    customer: CustomerData,
    cartRes: CartResponse
  ): CustomerData {
    return {
      ...customer,
      cart: cartRes.data,
    };
  }
  const handleAddToCart = async (productId: string) => {
    if (!customer?.id) {
      setCartMessage("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }
    setCartLoading(true);
    setCartMessage(null);
    try {
      const cartRes = await addCartItem(customer.id,{ productId: productId, quantity: 1 });
      setCustomer(mergeCartIntoCustomer(customer, cartRes));

      setCartMessage("Đã thêm vào giỏ hàng!");
      setTimeout(() => setCartMessage(null), 2000);
    } catch {
      setCartMessage("Không thể thêm vào giỏ hàng");
    } finally {
      setCartLoading(false);
    }
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await productService.getAllProducts();
      setProducts(data.data);
    } catch (e) {
      setError( "Không thể tải sản phẩm");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data.data);
    } catch {
      setError("Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const filteredSorted = useMemo(() => {
    let list = [...products];

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.categoryName));
    }

    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    switch (sortBy) {
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name, "vi"));
        break;
      case "price-asc":
      default:
        sorted.sort((a, b) => a.price - b.price);
        break;
    }

    return sorted;
  }, [products, selectedCategories, minPrice, maxPrice, searchQuery, sortBy]);

  const totalItems = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = Math.min(safePage * itemsPerPage, totalItems);

  const paginatedProducts = useMemo(() => {
    const from = (safePage - 1) * itemsPerPage;
    return filteredSorted.slice(from, from + itemsPerPage);
  }, [filteredSorted, safePage, itemsPerPage]);

  const handleCategoryChange = useCallback((next: string[]) => {
    setSelectedCategories(next);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePriceFilterChange = useCallback((nextMin: number, nextMax: number) => {
    setMinPrice(nextMin);
    setMaxPrice(nextMax);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((sortType: string) => {
    setSortBy(sortType);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategories([]);
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setSortBy(DEFAULT_SORT);
    setSearchQuery("");
    setCurrentPage(1);
  }, []);


  return {
    categories,
    loading,
    error,
    fetchProducts,
    selectedCategories,
    minPrice,
    maxPrice,
    sortBy,
    currentPage: safePage,
    paginatedProducts,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    handleCategoryChange,
    handleSearch,
    handlePriceFilterChange,
    handleSort,
    handlePageChange,
    resetFilters,
    handleAddToCart,
    cartLoading,
    cartMessage,

  };
}
