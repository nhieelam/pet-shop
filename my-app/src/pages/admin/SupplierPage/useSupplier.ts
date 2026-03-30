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

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [formData, setFormData] = useState<SupplierCreationRequest>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editFormData, setEditFormData] = useState<SupplierUpdateRequest>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (editModalOpen && supplierToEdit) {
      setEditFormData({
        name: supplierToEdit.name ?? "",
        email: supplierToEdit.email ?? "",
        phone: supplierToEdit.phone ?? "",
        address: supplierToEdit.address ?? "",
      });
    }
  }, [editModalOpen, supplierToEdit]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const payload: SupplierCreationRequest = {
        name: formData.name.trim(),
        email: formData.email?.trim() || undefined,
        phone: formData.phone.trim(),
        address: formData.address?.trim() || undefined,
      };
      await handleCreateSupplier(payload);
      setFormData({ name: "", email: "", phone: "", address: "" });
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierToEdit?.id) return;
    setEditSubmitting(true);
    try {
      const payload: SupplierUpdateRequest = {
        name: editFormData.name?.trim() || undefined,
        email: editFormData.email?.trim() || undefined,
        phone: editFormData.phone?.trim() || undefined,
        address: editFormData.address?.trim() || undefined,
      };
      await handleUpdateSupplier(supplierToEdit.id, payload);
    } finally {
      setEditSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteSubmitting(true);
    try {
      await handleDeleteSupplier();
    } finally {
      setDeleteSubmitting(false);
    }
  };

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

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

  const showToast = useCallback(
      (message: string, type: "success" | "error" | "info" = "info") => {
        setToast({ message, type });

        const t = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(t);
      },
      []
  );

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
    handleFormSubmit,
    handleEditSubmit,
    confirmDelete,
    showToast,
    formSubmitting,
    editSubmitting,
    deleteSubmitting,
    formData,
    setFormData,
    editFormData,
    setEditFormData,
  };
}