import {
  getAllInvoices,
  statisticsByYear,
  updateInvoiceStatus,
} from "@/services/invoiceService";
import type { PaymentStatus } from "@/type/type";
import type { InvoiceData } from "@/types/invoiceTypes";
import type { StatisticsData } from "@/types/statisticTypes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Loại bỏ bản ghi trùng cùng mã hóa đơn (API đôi khi trả lặp). */
function dedupeInvoicesById(items: InvoiceData[]): InvoiceData[] {
  const byId = new Map<string, InvoiceData>();
  let fallback = 0;
  for (const inv of items) {
    const id = inv.id?.trim();
    if (id) {
      if (!byId.has(id)) byId.set(id, inv);
    } else {
      byId.set(`__no-id-${fallback++}`, inv);
    }
  }
  return [...byId.values()];
}

export function useDashBoard() {
  const [yearStats, setYearStats] = useState<StatisticsData | null>(null);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [invoicesError, setInvoicesError] = useState<string | null>(null);
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(
    null
  );
  const [updatingInvoiceId, setUpdatingInvoiceId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [year] = useState(() => new Date().getFullYear());
  const loadIdRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const runId = ++loadIdRef.current;

    const load = async () => {
      setLoading(true);
      setInvoicesError(null);
      try {
        const [statResult, invResult] = await Promise.allSettled([
          statisticsByYear(year),
          getAllInvoices(),
        ]);
        if (cancelled || runId !== loadIdRef.current) return;

        if (statResult.status === "fulfilled") {
          setYearStats(statResult.value);
        } else {
          setYearStats(null);
        }

        if (invResult.status === "fulfilled") {
          const raw = invResult.value.data ?? [];
          setInvoices(Array.isArray(raw) ? raw : []);
          setInvoicesError(null);
        } else {
          setInvoices([]);
          setInvoicesError("Không tải được danh sách hóa đơn.");
        }
      } catch {
        if (!cancelled && runId === loadIdRef.current) {
          setYearStats(null);
          setInvoices([]);
          setInvoicesError("Không tải được danh sách hóa đơn.");
        }
      } finally {
        if (!cancelled && runId === loadIdRef.current) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [year]);

  const stats = useMemo(() => {
    if (yearStats) {
      return {
        total: yearStats.invoiceCount,
        revenue: yearStats.totalRealAmount,
      };
    }
    return { total: 0, revenue: 0 };
  }, [yearStats]);

  const invoicesSorted = useMemo(() => {
    return dedupeInvoicesById(invoices).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [invoices]);

  const handleInvoiceStatusChange = useCallback(
    async (invoiceId: string, nextStatus: PaymentStatus) => {
      setStatusUpdateError(null);
      setUpdatingInvoiceId(invoiceId);
      try {
        const res = await updateInvoiceStatus(invoiceId, nextStatus);
        const updated = res?.data;
        if (updated) {
          setInvoices((prev) =>
            prev.map((i) => (i.id === invoiceId ? { ...i, ...updated } : i))
          );
        }
      } catch (e) {
        setStatusUpdateError(
          e instanceof Error ? e.message : "Không thể cập nhật trạng thái."
        );
      } finally {
        setUpdatingInvoiceId(null);
      }
    },
    []
  );

  return {
    stats,
    year,
    yearStats,
    invoices: invoicesSorted,
    invoicesError,
    statusUpdateError,
    updatingInvoiceId,
    handleInvoiceStatusChange,
    loading,
  };
}
