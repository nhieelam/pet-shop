import { type FC } from "react";
import { Link } from "react-router-dom";

import { useDashBoard } from "./useDashBoard";
import type { PaymentStatus } from "@/type/type";
import { formatCurrency, formatDate } from "@/utils/format";
import {
  getPaymentStatusSelectOptions,
  PAYMENT_STATUS_OPTIONS,
  statusSelectClass,
} from "@/utils/paymentStatusUtil";

function statusLabel(code: string): string {
  const o = PAYMENT_STATUS_OPTIONS.find((x) => x.value === code);
  return o?.label ?? code;
}

const AdminDashboard: FC = () => {
  const {
    stats,
    year,
    yearStats,
    invoices,
    invoicesError,
    statusUpdateError,
    updatingInvoiceId,
    handleInvoiceStatusChange,
    loading,
  } = useDashBoard();

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tổng quan Dashboard</h1>
        <p className="text-gray-500 mt-2">Chào mừng bạn quay trở lại 👋</p>
      </div>

      {loading ? (
        <p className="text-slate-500 mb-10">Đang tải dữ liệu…</p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl" aria-hidden>
                📋
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium">
                Tổng đơn hàng{yearStats ? ` (${year})` : ""}
              </p>
              <p className="text-2xl font-bold text-slate-800">{stats.total.toLocaleString("vi-VN")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl" aria-hidden>
                💰
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium">
                Doanh thu{yearStats ? ` (${year})` : ""}
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {stats.revenue.toLocaleString("vi-VN")} ₫
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-gray-800">Hóa đơn gần đây</h2>
          <Link
            to="/admin/manageOrders"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Mở trang quản lý đơn hàng →
          </Link>
        </div>

        {invoicesError ? (
          <p className="px-6 py-4 text-sm text-amber-700 bg-amber-50">{invoicesError}</p>
        ) : null}

        {statusUpdateError ? (
          <p className="px-6 py-3 text-sm text-red-700 bg-red-50 border-b border-red-100">
            {statusUpdateError}
          </p>
        ) : null}

        <div className="overflow-x-auto">
          {invoices.length === 0 && !invoicesError ? (
            <p className="px-6 py-8 text-slate-500 text-sm text-center">
              Chưa có hóa đơn nào.
            </p>
          ) : invoices.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 bg-slate-50/80">
                  <th className="px-6 py-3 font-medium">Mã hóa đơn</th>
                  <th className="px-6 py-3 font-medium">Khách hàng</th>
                  <th className="px-6 py-3 font-medium text-right">Thành tiền</th>
                  <th className="px-6 py-3 font-medium">Trạng thái</th>
                  <th className="px-6 py-3 font-medium">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-3 font-mono text-xs text-slate-600 max-w-[8rem] truncate">
                      {inv.id}
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-800">
                      {inv.customerName || "—"}
                    </td>
                    <td className="px-6 py-3 text-right tabular-nums font-semibold text-slate-800">
                      {formatCurrency(inv.realAmount ?? inv.totalAmount)}
                    </td>
                    <td className="px-6 py-3">
                      {(() => {
                        const status = inv.status as PaymentStatus;
                        const isPending = status === "PENDING";
                        const selectBusy = updatingInvoiceId === inv.id;

                        if (isPending) {
                          return (
                            <select
                              value={status}
                              disabled={selectBusy}
                              onChange={(e) => {
                                const next = e.target.value as PaymentStatus;
                                if (next !== status) {
                                  void handleInvoiceStatusChange(inv.id, next);
                                }
                              }}
                              className={statusSelectClass(status)}
                              aria-label="Cập nhật trạng thái hóa đơn"
                            >
                              {getPaymentStatusSelectOptions("PENDING").map(
                                (opt) => (
                                  <option
                                    key={opt.value}
                                    value={opt.value}
                                    disabled={opt.disabled}
                                  >
                                    {opt.label}
                                  </option>
                                )
                              )}
                            </select>
                          );
                        }

                        return (
                          <select
                            value={status}
                            disabled
                            className={statusSelectClass(status)}
                            aria-label="Trạng thái hóa đơn (không đổi được)"
                          >
                            <option value={status}>{statusLabel(status)}</option>
                          </select>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-3 text-slate-600 whitespace-nowrap">
                      {formatDate(inv.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
