"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { ProductCreationRequest, ProductUpdateRequest } from "../../../types/productTypes";
import type { CategoryData } from "../../../types/categoryTypes";
import type { ProductData } from "../../../types/productTypes";
import * as productService from "../../../services/productService";
import * as categoryService from "../../../services/categoryService";
import { isCloudinaryConfigured } from "../../../services/cloudinaryService";
export function useListProducts() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [productToDelete, setProductToDelete] = useState<ProductData | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);


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

  const stats = useMemo(() => {
    const total = products.length;
    const available = products.filter((p) => p.available !== false).length;
    const lowStock = products.filter((p) => (p.quantity ?? 0) > 0 && (p.quantity ?? 0) <= 10).length;
    const outOfStock = products.filter((p) => (p.quantity ?? 0) === 0).length;
    return { total, available, lowStock, outOfStock };
  }, [products]);

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
  const allProducts = useMemo(() => products, [products]);

  return {
    categories,
    loading,
    error,
    stats,
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
    fileInputRef,
    formData,
    setFormData,
    cloudinaryEnabled,
    handleFormSubmit,
    confirmDelete,
    getCategoryName,
    allProducts,
    formSubmitting,
    deleteSubmitting,
  };
}
