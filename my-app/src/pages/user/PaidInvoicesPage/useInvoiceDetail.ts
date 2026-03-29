import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { getInvoiceById } from "../../../services/invoiceService";
import type { InvoiceData } from "../../../types/invoiceTypes";

export function useInvoiceDetail(invoiceId: string | undefined) {
  const { customer, isAuthenticated } = useAuth();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!invoiceId) {
      setInvoice(null);
      setError("Thiếu mã hóa đơn");
      setLoading(false);
      return;
    }
    if (!customer?.id) {
      setInvoice(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getInvoiceById(invoiceId);
      setInvoice(data.data);
    } catch (e) {
      setInvoice(null);
      setError(e instanceof Error ? e.message : "Không tải được hóa đơn");
    } finally {
      setLoading(false);
    }
  }, [invoiceId, customer?.id]);

  useEffect(() => {
    if (!isAuthenticated || !customer?.id) {
      setInvoice(null);
      setLoading(false);
      setError(null);
      return;
    }
    void load();
  }, [isAuthenticated, customer?.id, load]);

  return {
    invoice,
    loading,
    error,
    refetch: load,
    isAuthenticated,
  };
}
