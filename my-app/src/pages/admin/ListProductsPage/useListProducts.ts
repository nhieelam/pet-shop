"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { ProductCreationRequest, ProductUpdateRequest } from "../../../types/productTypes";
import type { CategoryData } from "../../../types/categoryTypes";
import type { ProductData } from "../../../types/productTypes";
import * as productService from "../../../services/productService";
import * as categoryService from "../../../services/categoryService";
import { isCloudinaryConfigured } from "../../../services/cloudinaryService";
import { uploadImageToCloudinary } from "../../../services/cloudinaryService";
import { exportTableToXls } from "@/utils/exportFile";
import { readXlsFirstSheetRows } from "@/utils/importFile";
  import { cellToString } from "@/utils/importFile";

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

export function useListProducts() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [productToDelete, setProductToDelete] = useState<ProductData | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(data.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data.data);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

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

  const stats = useMemo(() => {
    const total = products.length;
    const available = products.filter((p) => p.available !== false).length;
    const lowStock = products.filter((p) => (p.quantity ?? 0) > 0 && (p.quantity ?? 0) <= 10).length;
    const outOfStock = products.filter((p) => (p.quantity ?? 0) === 0).length;
    return { total, available, lowStock, outOfStock };
  }, [products]);

  const uniqueBrands = useMemo(() => [...new Set(products.map((p) => p.brand).filter(Boolean))].sort() as string[], [products]);

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (filters.search.trim()) c++;
    if (filters.categoryId) c++;
    if (filters.brand) c++;
    if (filters.availability) c++;
    if (filters.priceMin || filters.priceMax) c++;
    return c;
  }, [filters]);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, []);

  const openAddModal = useCallback(() => {
    setEditingProduct(null);
    setProductModalOpen(true);
  }, []);

  const openEditModal = useCallback((product: ProductData) => {
    setEditingProduct(product);
    console.log(product);
    setProductModalOpen(true);
  }, []);

  const closeProductModal = useCallback(() => {
    setProductModalOpen(false);
    setEditingProduct(null);
  }, []);

  const openDeleteModal = useCallback((product: ProductData) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  }, []);

  const handleCreateOrUpdateProduct = useCallback(
    async (payload: ProductCreationRequest | ProductUpdateRequest) => {
      try {
        if (editingProduct?.id) {
          await productService.updateProduct(editingProduct.id, payload as ProductUpdateRequest);
          showToast("Product updated successfully!", "success");
        } else {
          await productService.createProduct(payload as ProductCreationRequest);
          showToast("Product added successfully!", "success");
        }
        closeProductModal();
        await fetchProducts();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Failed to save product", "error");
        throw e;
      }
    },
    [editingProduct, closeProductModal, fetchProducts, showToast]
  );

  const handleDeleteProduct = useCallback(async () => {
    if (!productToDelete?.id) return;
    try {
      await productService.deleteProduct(productToDelete.id);
      showToast("Product deleted successfully!", "success");
      closeDeleteModal();
      await fetchProducts();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Failed to delete product", "error");
    }
  }, [productToDelete, closeDeleteModal, fetchProducts, showToast]);

  
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    brand: "",
    price: "",
    quantity: "",
    imageUrl: "",
    available: true,
  });

  const cloudinaryEnabled = isCloudinaryConfigured();

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImageUploadError(null);
    setImageUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData((d) => ({ ...d, imageUrl: url }));
    } catch (err) {
      setImageUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setImageUploading(false);
      e.target.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (productModalOpen && editingProduct) {
      setFormData({
        name: editingProduct.name ?? "",
        description: editingProduct.description ?? "",
        categoryId: editingProduct.categoryId ?? "",
        brand: editingProduct.brand ?? "",
        price: String(editingProduct.price ?? ""),
        quantity: String(editingProduct.quantity ?? ""),
        imageUrl: editingProduct.imageUrl ?? "",
        available: editingProduct.available !== false,
      });
    } else if (productModalOpen && !editingProduct) {
      setFormData({
        name: "",
        description: "",
        categoryId: "",
        brand: "",
        price: "",
        quantity: "",
        imageUrl: "",
        available: true,
      });
    }
  }, [productModalOpen, editingProduct]);

  const getCategoryName = (product: ProductData) => {
    const id = product.categoryId;
    if (id) {
      const cat = categories.find((c) => c.id === id);
      if (cat) return cat.name;
    }
    return product.categoryName ?? "Uncategorized";
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const payload: ProductCreationRequest = {
        name: formData.name.trim(),
        description: formData.description.trim() || "",
        categoryId: formData.categoryId,
        brand: formData.brand.trim() || "",
        price: parseFloat(formData.price) || 0,
        quantity: parseInt(formData.quantity, 10) || 0,
        imageUrl: formData.imageUrl.trim() || "",
      };
      await handleCreateOrUpdateProduct(payload);
    } finally {
      setFormSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteSubmitting(true);
    try {
      await handleDeleteProduct();
    } finally {
      setDeleteSubmitting(false);
    }
  };

  
  const handleExportProduct = useCallback(() => {
    exportTableToXls({
      filename: `product-export-${new Date().toISOString().slice(0, 10)}`,
      sheetName: "Product",
      headers: [
        "Product ID",
        "Product Name",
        "Product Description",
        "Product Category",
        "Product Brand",
        "Product Price",
        "Product Quantity",
      ],
      data: filteredProducts.map((p) => {
        return [
          p.id,
          p.name ?? "",
          p.description ?? "",
          p.categoryName ?? "",
          p.brand ?? "",
          p.price ?? 0,
          p.quantity ?? 0,
        ];
      }),
    });
  }, [filteredProducts]);
  const handleImportProductFile = useCallback(async (file: File) => {
    setImportSubmitting(true);
    try {
      const rows = await readXlsFirstSheetRows(file);
      if (!rows.length) {
        throw new Error("File is empty");
      }
      const headerRow = rows[0];
      const list: ProductCreationRequest[] = [];
      const get = (key: string, row: unknown[]) => {
        const idx = headerRow.indexOf(key);
        if (idx === undefined) return "";
        return cellToString(row[idx]);
      };
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r] as unknown[];
        try {
          const name = get("name", row);
          const description = get("description", row);
          const categoryId = get("categoryId", row);
          const brand = get("brand", row);
          const price = get("price", row);
          const quantity = get("quantity", row);
          const imageUrl = get("imageUrl", row);
          list.push({
            name,
            description,
            categoryId,
            brand,
            price: parseFloat(price) || 0,
            quantity: parseInt(quantity, 10) || 0,
            imageUrl,
          });
        } catch (e) {
          console.error(`Error processing row ${r + 1}:`, e);
        }
      }
      console.log("list",list);

      await productService.createListProduct({products:list});
      showToast(`Đã nhập ${list.length} sản phẩm từ file`, "success");
      await fetchProducts();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Nhập file thất bại", "error");
    } finally {
      setImportSubmitting(false);
    }
  }, []);
  const [importSubmitting, setImportSubmitting] = useState(false);

  return {
    products: filteredProducts,
    allProducts: products,
    categories,
    loading,
    error,
    filters,
    updateFilter,
    clearAllFilters,
    filtersVisible,
    setFiltersVisible,
    viewMode,
    setViewMode,
    stats,
    uniqueBrands,
    activeFilterCount,
    productModalOpen,
    deleteModalOpen,
    editingProduct,
    productToDelete,
    toast,
    openAddModal,
    openEditModal,
    closeProductModal,
    openDeleteModal,
    closeDeleteModal,
    handleCreateOrUpdateProduct,
    handleDeleteProduct,
    showToast,
    fetchProducts,
    formSubmitting,
    deleteSubmitting,
    imageUploading,
    imageUploadError,
    fileInputRef,
    formData,
    setFormData,
    cloudinaryEnabled,
    handleImageFileChange,
    handleFormSubmit,
    confirmDelete,
    getCategoryName,
    setImageUploadError,
    handleExportProduct,
    handleImportProductFile,
    importSubmitting,
  };
}
