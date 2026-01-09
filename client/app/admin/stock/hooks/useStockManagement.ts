import { useEffect, useMemo, useState, useCallback } from "react";
import { StockProduct } from "../types";
import { STORAGE_KEY, DEFAULT_PRODUCTS } from "../constants";

interface UseStockManagementReturn {
  products: StockProduct[];
  isLoading: boolean;
  selectedProductId: string;
  addQuantity: string;
  selectedProduct: StockProduct | null;
  setSelectedProductId: (id: string) => void;
  setAddQuantity: (quantity: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const isValidProduct = (p: any): p is StockProduct => {
  return (
    p &&
    typeof p.id === "string" &&
    typeof p.name === "string" &&
    typeof p.stock === "number"
  );
};

const loadProductsFromStorage = (): StockProduct[] => {
  if (typeof window === "undefined") {
    return DEFAULT_PRODUCTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_PRODUCTS;
    }

    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.every(isValidProduct)
    ) {
      return parsed;
    }

    return DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
};

const saveProductsToStorage = (products: StockProduct[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // Ignore storage errors
  }
};

export function useStockManagement(): UseStockManagementReturn {
  const [products, setProducts] = useState<StockProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [addQuantity, setAddQuantity] = useState<string>("");

  useEffect(() => {
    const loadedProducts = loadProductsFromStorage();
    setProducts(loadedProducts);
    setIsLoading(false);
  }, []);

  const persist = useCallback((next: StockProduct[]) => {
    setProducts(next);
    saveProductsToStorage(next);
  }, []);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) || null,
    [products, selectedProductId]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedProductId) {
        alert("Vui lòng chọn sản phẩm.");
        return;
      }

      const qty = Number(addQuantity);
      if (!Number.isFinite(qty) || qty <= 0 || !Number.isInteger(qty)) {
        alert("Số lượng nhập kho phải là số nguyên > 0.");
        return;
      }

      const next = products.map((p) =>
        p.id === selectedProductId ? { ...p, stock: p.stock + qty } : p
      );
      persist(next);
      setAddQuantity("");
      alert("Nhập kho thành công!");
    },
    [selectedProductId, addQuantity, products, persist]
  );

  return {
    products,
    isLoading,
    selectedProductId,
    addQuantity,
    selectedProduct,
    setSelectedProductId,
    setAddQuantity,
    handleSubmit,
  };
}
