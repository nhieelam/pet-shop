"use client";

import { useEffect } from "react";
import type { InvoiceData } from "@/types/invoiceTypes";
import StatusBadge from "./StatusBadge";

function formatMoney(n: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function paymentMethodLabel(method: string | undefined) {
  if (!method) return "—";
  const u = method.toUpperCase().replace(/-/g, "_");
  if (u === "COD") return "Thanh toán khi nhận hàng (COD)";
  if (u === "QR_SCANNING") return "Quét mã QR";
  return method;
}

function invoiceStatus(inv: InvoiceData): string {
  const ext = inv as InvoiceData & { status?: string; paymentStatus?: string };
  return ext.status ?? ext.paymentStatus ?? "PENDING";
}

type Props = {
  invoice: InvoiceData | null;
  open: boolean;
  onClose: () => void;
};

export default function InvoiceDetailModal({ invoice, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open || !invoice) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="invoice-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Đóng"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-xl bg-white shadow-xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-gray-100 bg-white px-4 py-3 sm:px-6">
          <h2 id="invoice-detail-title" className="text-lg font-bold text-gray-900">
            Chi tiết hóa đơn
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:pb-6 space-y-6">
          <header className="space-y-2">
            <p className="text-sm text-gray-500">Mã hóa đơn</p>
            <p className="text-xl font-bold text-gray-900 font-mono break-all">{invoice.id}</p>
            <p className="text-sm text-gray-600">
              Tạo lúc <span className="font-medium">{formatDate(invoice.createdAt)}</span>
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-sm text-gray-600">Trạng thái:</span>
              <StatusBadge status={invoiceStatus(invoice)} />
            </div>
          </header>

          <section className="rounded-lg border border-gray-100 bg-gray-50/80 p-4 text-sm">
            <dl className="space-y-3">
              <div>
                <dt className="font-semibold text-gray-800">Khách hàng</dt>
                <dd className="text-gray-700">{invoice.customerName}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-800">Phương thức thanh toán</dt>
                <dd className="text-gray-700">{paymentMethodLabel(invoice.paymentMethod)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-800">Địa chỉ giao hàng</dt>
                <dd className="text-gray-700">{invoice.shippingAddress || "—"}</dd>
              </div>
              <div className="flex flex-wrap gap-6 pt-2 border-t border-gray-200">
                <div>
                  <dt className="text-gray-500 text-xs">Tạm tính</dt>
                  <dd className="font-semibold">{formatMoney(Number(invoice.totalAmount ?? 0))}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs">Thành tiền</dt>
                  <dd className="text-lg font-bold text-emerald-700">
                    {formatMoney(Number(invoice.realAmount ?? invoice.totalAmount ?? 0))}
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          {invoice.invoiceDetails?.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-gray-800 mb-3">Chi tiết dòng hàng</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-gray-600">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Sản phẩm</th>
                      <th className="px-3 py-2 font-semibold text-right">Đơn giá</th>
                      <th className="px-3 py-2 font-semibold text-right">SL</th>
                      <th className="px-3 py-2 font-semibold text-right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.invoiceDetails.map((d) => (
                      <tr key={d.id} className="border-t border-gray-100">
                        <td className="px-3 py-2 text-gray-800">{d.productName || d.productId}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{formatMoney(d.unitPrice)}</td>
                        <td className="px-3 py-2 text-right">{d.quantity}</td>
                        <td className="px-3 py-2 text-right font-medium tabular-nums">
                          {formatMoney(d.totalPrice ?? d.unitPrice * d.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
