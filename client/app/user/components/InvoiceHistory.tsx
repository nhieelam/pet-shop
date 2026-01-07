"use client";

import { useState, useMemo } from "react";

interface Invoice {
  id: string;
  date: string;
  status: "Paid" | "Pending" | "Cancelled";
  totalAmount: number;
  items: number;
}

const mockInvoices: Invoice[] = [
  {
    id: "INV-2025-001",
    date: "2025-01-05",
    status: "Paid",
    totalAmount: 750000,
    items: 3,
  },
  {
    id: "INV-2025-002",
    date: "2025-01-03",
    status: "Paid",
    totalAmount: 450000,
    items: 2,
  },
  {
    id: "INV-2025-003",
    date: "2025-01-01",
    status: "Pending",
    totalAmount: 280000,
    items: 1,
  },
  {
    id: "INV-2024-048",
    date: "2024-12-28",
    status: "Paid",
    totalAmount: 320000,
    items: 2,
  },
  {
    id: "INV-2024-047",
    date: "2024-12-25",
    status: "Paid",
    totalAmount: 550000,
    items: 4,
  },
  {
    id: "INV-2024-046",
    date: "2024-12-20",
    status: "Cancelled",
    totalAmount: 180000,
    items: 1,
  },
  {
    id: "INV-2024-045",
    date: "2024-12-15",
    status: "Paid",
    totalAmount: 420000,
    items: 2,
  },
  {
    id: "INV-2024-044",
    date: "2024-12-10",
    status: "Paid",
    totalAmount: 890000,
    items: 5,
  },
  {
    id: "INV-2024-043",
    date: "2024-12-05",
    status: "Paid",
    totalAmount: 310000,
    items: 2,
  },
  {
    id: "INV-2024-042",
    date: "2024-11-30",
    status: "Paid",
    totalAmount: 625000,
    items: 3,
  },
];

const ITEMS_PER_PAGE = 5;

export default function InvoiceHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");

  // Sort invoices
  const sortedInvoices = useMemo(() => {
    const sorted = [...mockInvoices];
    switch (sortBy) {
      case "date-desc":
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "date-asc":
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "amount-desc":
        return sorted.sort((a, b) => b.totalAmount - a.totalAmount);
      case "amount-asc":
        return sorted.sort((a, b) => a.totalAmount - b.totalAmount);
      default:
        return sorted;
    }
  }, [sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedInvoices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedInvoices = sortedInvoices.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "Paid":
        return "✓ Đã thanh toán";
      case "Pending":
        return "⏳ Chờ thanh toán";
      case "Cancelled":
        return "✕ Bị hủy";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <label className="text-sm font-semibold text-gray-700">Sắp xếp theo:</label>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as any);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          aria-label="Sắp xếp hóa đơn"
        >
          <option value="date-desc">Ngày mới nhất</option>
          <option value="date-asc">Ngày cũ nhất</option>
          <option value="amount-desc">Số tiền cao nhất</option>
          <option value="amount-asc">Số tiền thấp nhất</option>
        </select>
      </div>

      {/* Invoices Table - Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Mã hóa đơn
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Ngày
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Số mục
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(invoice.date).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {invoice.items} sản phẩm
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                  ₫{invoice.totalAmount.toLocaleString("vi-VN")}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                    {getStatusLabel(invoice.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  <button
                    className="text-blue-600 hover:text-blue-800 font-semibold transition"
                    aria-label={`Xem chi tiết hóa đơn ${invoice.id}`}
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoices Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {paginatedInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-gray-800">{invoice.id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(invoice.date).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                {getStatusLabel(invoice.status)}
              </span>
            </div>

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Số mục:</span> {invoice.items}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Tổng tiền:</span>
                <span className="text-lg font-bold text-blue-600 ml-2">
                  ₫{invoice.totalAmount.toLocaleString("vi-VN")}
                </span>
              </p>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              aria-label={`Xem chi tiết hóa đơn ${invoice.id}`}
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockInvoices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 text-lg">📄 Bạn chưa có hóa đơn nào</p>
          <p className="text-gray-500 mt-2">Hóa đơn của bạn sẽ xuất hiện ở đây sau khi hoàn tất đơn hàng</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-6">
          {/* Page Numbers */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold transition"
              aria-label="Trang trước"
            >
              ← Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
                aria-label={`Trang ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold transition"
              aria-label="Trang sau"
            >
              Sau →
            </button>
          </div>

          {/* Results Counter */}
          <p className="text-sm text-gray-600">
            Hiển thị {startIndex + 1}–{Math.min(endIndex, sortedInvoices.length)} trong {sortedInvoices.length} hóa đơn
          </p>
        </div>
      )}
    </div>
  );
}
