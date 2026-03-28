import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { getInvoicesByCustomerId } from "@/services/invoiceService";
import type { InvoiceData } from "@/types/invoiceTypes";

export function usePaidInvoices() {
  const { customer, isAuthenticated } = useAuth();
  const [paidInvoices, setPaidInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const customerId = customer?.id;

  const fetchPaid = useCallback(async () => {
    if (!customerId) {
      setPaidInvoices([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const list = await getInvoicesByCustomerId(customerId);
      setPaidInvoices(list.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được hóa đơn");
      setPaidInvoices([]);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    if (!isAuthenticated || !customerId) {
      setPaidInvoices([]);
      setLoading(false);
      return;
    }
    void fetchPaid();
  }, [isAuthenticated, customerId, fetchPaid]);

  return {
    paidInvoices,
    loading,
    error,
    refetch: fetchPaid,
    isAuthenticated,
  };
}
