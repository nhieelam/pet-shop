"use client";

import CartItemRow from "./components/CartItemRow";
import CartSummary from "./components/CartSummary";
import SelectAllBar from "./components/SelectAllBar";
import { useCart } from "./hooks";

export default function CartPage() {
  const {
    items,
    allSelected,
    toggleSelect,
    selectAll,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    checkout,
  } = useCart();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🛒 Giỏ Hàng</h1>
          <p className="text-gray-600">
            Bạn có <span className="font-bold text-gray-800">{items.length}</span> sản phẩm trong giỏ hàng
          </p>
        </div>

        {/* Empty Cart State */}
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-6">Chưa có sản phẩm nào trong giỏ hàng của bạn</p>
            <a
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
            >
              Quay lại mua sắm
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {/* Select All Bar */}
              <SelectAllBar
                items={items}
                allSelected={allSelected}
                onSelectAll={selectAll}
              />

              {/* Cart Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onToggleSelect={toggleSelect}
                    onIncrement={incrementQuantity}
                    onDecrement={decrementQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              {/* Continue Shopping CTA */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
                >
                  ← Tiếp tục mua sắm
                </a>
              </div>
            </div>

            {/* Cart Summary Sidebar */}
            <div className="lg:col-span-1">
              <CartSummary items={items} onCheckout={checkout} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
