"use client";

import { useStockManagement } from "./hooks/useStockManagement";

export default function AdminStockInPage() {
  const {
    products,
    isLoading,
    selectedProductId,
    addQuantity,
    selectedProduct,
    setSelectedProductId,
    setAddQuantity,
    handleSubmit,
  } = useStockManagement();

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            📥 Trang Nhập Kho
          </h1>
          <p className="text-gray-600">Tăng số lượng tồn kho cho sản phẩm</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {isLoading ? (
            <div className="text-center text-gray-600 py-12">Đang tải...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Chọn sản phẩm <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- Chọn sản phẩm --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {selectedProduct && (
                  <p className="text-sm text-gray-600 mt-2">
                    Tồn kho hiện tại:{" "}
                    <span className="font-bold">{selectedProduct.stock}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Số lượng nhập kho <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={addQuantity}
                  onChange={(e) => setAddQuantity(e.target.value)}
                  placeholder="VD: 10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Cập nhật tồn kho
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

