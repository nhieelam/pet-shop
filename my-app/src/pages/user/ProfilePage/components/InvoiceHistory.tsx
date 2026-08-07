"use client";

import { useMemo, useState, useCallback } from "react";
import { useInvoiceHistory } from "../hooks/useInvoiceHistory";
import type { Invoice } from "../hooks/useInvoiceHistory";
import type { SortOption } from "../../../../type/type";
import { useProfile } from "../hooks/useProfile";
import type { InvoiceData } from "@/types/invoiceTypes";
import Pagination from "./Pagination";
import StatusBadge from "./StatusBadge";
import InvoiceDetailModal from "./InvoiceDetailModal";

function mapInvoiceDataToRows(invoices: InvoiceData[]): Invoice[] {
  return invoices.map((inv) => ({
    id: inv.id,
    date: inv.createdAt,
    status: getInvoiceStatus(inv),
    totalAmount: Number(inv.realAmount ?? inv.totalAmount ?? 0),
    items: inv.invoiceDetails?.length ?? 0,
  }));
}

function getInvoiceStatus(inv: InvoiceData): string {
  const ext = inv as InvoiceData & { status?: string; paymentStatus?: string };
  return ext.status ?? ext.paymentStatus ?? "PENDING";
}

export default function InvoiceHistory() {
  const { customer } = useProfile();
  const [detailInvoiceId, setDetailInvoiceId] = useState<string | null>(null);

  const detailInvoice = useMemo((): InvoiceData | null => {
    if (!detailInvoiceId || !customer?.invoices?.length) return null;
    return customer.invoices.find((inv) => inv.id === detailInvoiceId) ?? null;
  }, [customer?.invoices, detailInvoiceId]);

  const openDetail = useCallback((invoiceId: string) => {
    setDetailInvoiceId(invoiceId);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailInvoiceId(null);
  }, []);

  const rows = useMemo(
    () => mapInvoiceDataToRows(customer?.invoices ?? []),
    [customer?.invoices]
  );

  const {
    currentInvoices,
    currentPage,
    totalPages,
    sortBy,
    setSortBy,
    goToPage,
    startIndex,
    totalCount,
  } = useInvoiceHistory(rows);

  const fmtMoney = (n: number) => `₫${n.toLocaleString("vi-VN")}`;
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("vi-VN");

  return (
    <div className="space-y-6">
      <InvoiceDetailModal
        invoice={detailInvoice}
        open={detailInvoiceId !== null && detailInvoice !== null}
        onClose={closeDetail}
      />
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <label className="text-sm font-semibold text-gray-700">Sắp xếp theo:</label>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as SortOption);
            goToPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="date-desc">Ngày mới nhất</option>
          <option value="date-asc">Ngày cũ nhất</option>
          <option value="amount-desc">Số tiền cao nhất</option>
          <option value="amount-asc">Số tiền thấp nhất</option>
        </select>
      </div>

      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              {["Mã hóa đơn", "Ngày", "Số mục", "Tổng tiền", "Trạng thái", "Hành động"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fmtDate(invoice.date)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.items} sản phẩm</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">{fmtMoney(invoice.totalAmount)}</td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  <button
                    type="button"
                    onClick={() => openDetail(invoice.id)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {currentInvoices.map((invoice) => (
          <div key={invoice.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-gray-800">{invoice.id}</p>
                <p className="text-sm text-gray-600">{fmtDate(invoice.date)}</p>
              </div>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Số mục:</span> {invoice.items}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Tổng tiền:</span>
                <span className="text-lg font-bold text-blue-600 ml-2">{fmtMoney(invoice.totalAmount)}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => openDetail(invoice.id)}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {totalCount === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600">📄 Bạn chưa có hóa đơn nào</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Pagination current={currentPage} total={totalPages} onChange={goToPage} />
          <p className="text-sm text-gray-600">
            Hiển thị {startIndex + 1}–{startIndex + currentInvoices.length} trong {totalCount} hóa đơn
          </p>
        </div>
      )}
    </div>
  );
}
