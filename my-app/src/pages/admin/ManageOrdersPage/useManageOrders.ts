"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { InvoiceData } from "../../../types/invoiceTypes.ts";
import * as invoiceService from "../../../services/invoiceService.ts";

export type ViewMode = "grid" | "list";

export function useManageOrders() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
  const [invoiceToDelete, setInvoiceToDelete] = useState<InvoiceData | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await invoiceService.getAllInvoices();
      setInvoices(data.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load orders");
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const stats = useMemo(() => {
    const total = invoices.length;
    const statusCounts: Record<string, number> = {};
    invoices.forEach((inv) => {
      const s = inv.status;
      statusCounts[s] = (statusCounts[s] ?? 0) + 1;
    });
    return { total, statusCounts };
  }, [invoices]);

  const uniqueStatuses = useMemo(
    () => [...new Set(invoices.map((inv) => inv.status).filter(Boolean))].sort() as unknown as string[],
    [invoices]
  );

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, []);

  const openDetailModal = useCallback((invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
    setDetailModalOpen(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setDetailModalOpen(false);
    setSelectedInvoice(null);
  }, []);

  const openDeleteModal = useCallback((invoice: InvoiceData) => {
    setInvoiceToDelete(invoice);
    setDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setInvoiceToDelete(null);
  }, []);

  const handleDeleteInvoice = useCallback(async () => {
    if (!invoiceToDelete?.id) return;
    try {
      await invoiceService.deleteInvoice(invoiceToDelete.id);
      showToast("Order deleted successfully!", "success");
      closeDeleteModal();
      await fetchInvoices();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Failed to delete order", "error");
    }
  }, [invoiceToDelete, closeDeleteModal, fetchInvoices, showToast]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setStatusFilter("");
  }, []);

  const filteredInvoices = useMemo(() => {
    let result = [...invoices];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (inv) =>
          (inv.id).toLowerCase().includes(q) ||
          (inv.customerName).toLowerCase().includes(q) ||
          (inv.shippingAddress).toLowerCase().includes(q)
      );
    }
    if (statusFilter) {
      result = result.filter((inv) => (inv.status) === statusFilter);
    }
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }, [invoices, search, statusFilter]);

  return {
    invoices: filteredInvoices,
    allInvoices: invoices,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    viewMode,
    setViewMode,
    stats,
    uniqueStatuses,
    detailModalOpen,
    deleteModalOpen,
    selectedInvoice,
    invoiceToDelete,
    toast,
    openDetailModal,
    closeDetailModal,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteInvoice,
    clearFilters,
    fetchInvoices,
  };
}
