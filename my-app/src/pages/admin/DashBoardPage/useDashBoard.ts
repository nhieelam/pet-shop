import { getAllInvoices, updateInvoiceStatus } from "@/services/invoiceService";
import type { InvoiceData } from "@/types/invoiceTypes";
import type { PaymentStatus } from "@/type/type";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useDashBoard() {
    const [invoices, setInvoices] = useState<InvoiceData[]>([]);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
      const fetchInvoices = async () => {
        try {
          const json = await getAllInvoices();
          setInvoices(json.data);
        } catch {
          setInvoices([]);
        }
      };
  
      void fetchInvoices();
    }, []);
  
    const stats = useMemo(() => {
      const totalOrders = invoices.length;
      const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.totalAmount ?? 0), 0);
      return [
        {
          title: "Tổng đơn hàng",
          value: totalOrders.toLocaleString("vi-VN"),
        },
        {
          title: "Doanh thu",
          value: `${totalRevenue.toLocaleString("vi-VN")} ₫`,
        },
      ];
    }, [invoices]);
  
    const recentOrders = useMemo(() => {
      return [...invoices]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
    }, [invoices]);
  
    const handleStatusChange = useCallback(async (orderId: string, next: PaymentStatus) => {
      setUpdatingId(orderId);
      try {
        await updateInvoiceStatus(orderId, next);
        setInvoices((prev) =>
          prev.map((inv) => (inv.id === orderId ? { ...inv, status: next } : inv))
        );
      } catch (e) {
        window.alert(e instanceof Error ? e.message : "Không thể cập nhật trạng thái");
      } finally {
        setUpdatingId(null);
      }
    }, []);
  return {
    stats,
    recentOrders,
    handleStatusChange,
    updatingId,

  };
}