"use client";

import { Link } from "react-router-dom";
import { useReview } from "./useReview";
import type { PaymentMethod } from "@/types/invoiceTypes";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value ?? 0);
}

function formatDate(d: string): string {
  return new Date(d).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function paymentMethodLabel(method: string | undefined): string {
  if (!method) return "—";
  const u = method.toUpperCase().replace(/-/g, "_");
  if (u === "COD") return "Thanh toán khi nhận hàng (COD)";
  if (u === "QR_SCANNING") return "Quét mã QR";
  return method;
}

export default function ReviewPage() {
  const {
    placingOrder,
    error,
    createdInvoice,
    checkoutItems,
    subtotal,
    totalAmount,
    useDefaultAddress,
    newAddress,
    paymentMethod,
    setPaymentMethod,
    setUseDefaultAddress,
    setNewAddress,
    placeOrder,
  } = useReview();

  if (createdInvoice) {
    const inv = createdInvoice;
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
            <p className="font-bold text-lg">Đặt hàng thành công</p>
            <p className="text-sm mt-1">Cảm ơn bạn đã mua hàng. Thông tin hóa đơn bên dưới.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-5">
              <p className="text-sm text-gray-500">Mã hóa đơn</p>
              <h1 className="text-2xl font-bold text-gray-900 font-mono break-all mt-1">{inv.id}</h1>
              <p className="text-sm text-gray-600 mt-2">
                Tạo lúc <span className="font-medium">{formatDate(inv.createdAt)}</span>
              </p>
            </div>

            <div className="px-6 py-5 space-y-4 border-b border-gray-100">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-600">Khách hàng</span>
                <span className="font-semibold text-gray-900 text-right">{inv.customerName}</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-600">Địa chỉ giao hàng</span>
                <span className="font-semibold text-gray-900 text-right">{inv.shippingAddress}</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-600">Phương thức thanh toán</span>
                <span className="font-semibold text-gray-900">{paymentMethodLabel(inv.paymentMethod)}</span>
              </div>
            </div>

            <div className="px-6 py-5">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Chi tiết sản phẩm</h2>
              <div className="space-y-3">
                {inv.invoiceDetails?.map((line) => (
                  <div
                    key={line.id}
                    className="flex justify-between gap-4 border-b border-gray-50 pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{line.productName}</p>
                      <p className="text-sm text-gray-600">
                        {line.quantity} × {formatCurrency(line.unitPrice)}
                        {!!line.discountAmount && (
                          <span className="text-emerald-600"> · Giảm {formatCurrency(line.discountAmount)}</span>
                        )}
                      </p>
                    </div>
                    <div className="font-semibold text-gray-900 whitespace-nowrap">
                      {formatCurrency(line.totalPrice - (line.discountAmount || 0))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 space-y-2 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-semibold">{formatCurrency(inv.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-800 font-bold">Thành tiền</span>
                <span className="text-red-600 font-bold">{formatCurrency(inv.realAmount)}</span>
              </div>
            </div>

            <div className="px-6 py-5 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/user/invoices/${inv.id}`}
                className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
              >
                Xem chi tiết hóa đơn
              </Link>
              <Link
                to="/user/products"
                className="flex-1 text-center border border-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-50"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Xác nhận đơn hàng</h1>
          <p className="text-gray-600 mt-2">Kiểm tra thông tin sản phẩm, thanh toán và giao hàng trước khi đặt.</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Sản phẩm đã chọn</h2>

            {checkoutItems.length > 0 ? (
              <div className="space-y-4">
                {checkoutItems.map((item) => {
                  const lineTotal = item.price * Number(item.quantity);
                  return (
                    <div
                      key={`${item.id}-${item.productId ?? item.petId ?? "line"}`}
                      className="flex gap-4 border-b border-gray-100 pb-4"
                    >
                      <img
                        src={item.image || "https://placehold.co/100x100?text=Pet"}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Đơn giá: {formatCurrency(item.price)}</p>
                      </div>
                      <div className="font-bold text-gray-800">{formatCurrency(lineTotal)}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-500">Không có sản phẩm để thanh toán.</div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-20">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Thanh toán và giao hàng</h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phương thức thanh toán</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="QR_Scanning">Quét QR</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ giao hàng</label>
              <div className="space-y-2 mb-2">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    checked={useDefaultAddress}
                    onChange={() => setUseDefaultAddress(true)}
                  />
                  Dùng địa chỉ mặc định
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    checked={!useDefaultAddress}
                    onChange={() => setUseDefaultAddress(false)}
                  />
                  Nhập địa chỉ mới
                </label>
              </div>

              {!useDefaultAddress && (
                <textarea
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Nhập địa chỉ giao hàng mới"
                />
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-800 font-bold">Thành tiền</span>
                <span className="text-red-600 font-bold">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={placingOrder || checkoutItems.length === 0}
              onClick={placeOrder}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold disabled:opacity-60"
            >
              {placingOrder ? "Đang đặt hàng..." : "Đặt hàng"}
            </button>

            <Link to="/user/cart" className="block text-center mt-3 text-sm text-blue-600 hover:text-blue-700">
              ← Quay lại giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
