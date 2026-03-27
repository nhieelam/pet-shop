"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  SupplierCreationRequest,
  SupplierUpdateRequest,
  SupplierData,
} from "../../../types/supplierTypes";

import * as supplierService from "../../../services/supplierService";

export type ViewMode = "grid" | "list";

export function useSupplier() {
  const [supplierList, setSupplierList] = useState<SupplierData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [supplierToEdit, setSupplierToEdit] = useState<SupplierData | null>(null);
  const [supplierToDelete, setSupplierToDelete] = useState<SupplierData | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // ================= FETCH DATA =================

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await supplierService.getAllSuppliers() ;
      setSupplierList(data.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load suppliers");
      setSupplierList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  // ================= FILTER =================

  const filteredSuppliers = useMemo(() => {
    let result = [...supplierList];

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter( (s: SupplierData) =>
          s.name?.toLowerCase().includes(q) ||
              s.email?.toLowerCase().includes(q) ||
              s.phone?.toLowerCase().includes(q) ||
              s.address?.toLowerCase().includes(q)
        );
    }

    result.sort((a: SupplierData, b: SupplierData) => a.name?.localeCompare(b.name ?? "") ?? 0);
    return result;
  }, [supplierList, search]);

  // ================= TOAST =================

  const showToast = useCallback(
      (message: string, type: "success" | "error" | "info" = "info") => {
        setToast({ message, type });

        const t = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(t);
      },
      []
  );

  // ================= MODAL =================

  const openAddModal = () => setFormModalOpen(true);

  const openEditModal = (supplier: SupplierData) => {
    setSupplierToEdit(supplier);
    setEditModalOpen(true);
  };

  const openDeleteModal = (supplier: SupplierData) => {
    setSupplierToDelete(supplier);
    setDeleteModalOpen(true);
  };

  const closeFormModal = () => setFormModalOpen(false);

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSupplierToEdit(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSupplierToDelete(null);
  };

  // ================= CRUD =================

  const handleCreateSupplier = useCallback(
      async (payload: SupplierCreationRequest) => {
        try {
          await supplierService.createSupplier(payload);

          showToast("Supplier added successfully!", "success");

          closeFormModal();

          await fetchSuppliers();
        } catch (e) {
          showToast(e instanceof Error ? e.message : "Failed to add supplier", "error");
          throw e;
        }
      },
      [fetchSuppliers, showToast]
  );

  const handleUpdateSupplier = useCallback(
      async (id: string, payload: SupplierUpdateRequest) => {
        try {
          await supplierService.updateSupplier(id, payload);

          showToast("Supplier updated successfully!", "success");

          closeEditModal();

          await fetchSuppliers();
        } catch (e) {
          showToast(e instanceof Error ? e.message : "Failed to update supplier", "error");
          throw e;
        }
      },
      [fetchSuppliers, showToast]
  );

  const handleDeleteSupplier = useCallback(async () => {
    if (!supplierToDelete?.id) return;

    try {
      await supplierService.deleteSupplier(supplierToDelete.id);

      showToast("Supplier deleted successfully!", "success");

      closeDeleteModal();

      await fetchSuppliers();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Failed to delete supplier", "error");
    }
  }, [supplierToDelete, fetchSuppliers, showToast]);

  // ================= RETURN =================

  return {
    suppliers: filteredSuppliers,
    allSuppliers: supplierList,

    loading,
    error,

    search,
    setSearch,

    viewMode,
    setViewMode,

    formModalOpen,
    editModalOpen,
    deleteModalOpen,

    supplierToEdit,
    supplierToDelete,

    toast,

    openAddModal,
    openEditModal,
    openDeleteModal,

    closeFormModal,
    closeEditModal,
    closeDeleteModal,

    handleCreateSupplier,
    handleUpdateSupplier,
    handleDeleteSupplier,

    fetchSuppliers,
  };
}