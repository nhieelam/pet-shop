import { useEffect, useState } from "react";
import type { CategoryData } from "@/types/categoryTypes";
import type { ProductData } from "@/types/productTypes";

import { getAllProducts } from "@/services/productService";
import { getAllCategories } from "@/services/categoryService";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data.data);
    } catch (err) {
      setError("Lỗi khi load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data.data);
    } catch (err) {
      setError("Lỗi khi load categories");
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    products,
    loading,
    error,
    fetchProducts,
    fetchCategories,
  };
};