import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { getAllInvoices, updateInvoiceStatus } from "@/services/invoiceService";
import type { InvoiceData } from "@/types/invoiceTypes.ts";
import type { PaymentStatus } from "@/type/type";
import {
  getPaymentStatusSelectOptions,
  isTerminalPaymentStatus,
  statusSelectClass,
} from "@/utils/paymentStatusUtil";





const AdminDashboard: FC = () => {
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

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tổng quan Dashboard</h1>
        <p className="text-gray-500 mt-2">Chào mừng bạn quay trở lại 👋</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
          >
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2 text-gray-800">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Đơn hàng gần đây</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="pb-3">Mã đơn</th>
                <th className="pb-3">Khách hàng</th>
                <th className="pb-3">Tổng tiền</th>
                <th className="pb-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 font-medium text-indigo-600">{order.id}</td>

                  <td className="py-4">{order.customerName ?? "Khách lẻ"}</td>

                  <td className="py-4">{order.realAmount.toLocaleString("vi-VN")} ₫</td>

                  <td className="py-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id || isTerminalPaymentStatus(order.status)}
                      onChange={(e) => {
                        const next = e.target.value as PaymentStatus;
                        void handleStatusChange(order.id, next);
                      }}
                      className={statusSelectClass(order.status)}
                      aria-label="Cập nhật trạng thái đơn hàng"
                    >
                      {getPaymentStatusSelectOptions(order.status).map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
