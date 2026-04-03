"use client";

import { Link } from "react-router-dom";
import CartItemRow from "./components/CartItemRow";
import PetCartItemRow from "./components/PetCartItemRow";
import CartSummary from "./components/CartSummary";
import SelectAllBar from "./components/SelectAllBar";
import { useCart } from "./useCart";

export default function CartPage() {
  const {
    items,
    productItems,
    petItems,
    selection,
    allSelected,
    loading,
    error,
    isAuthenticated,
    promotions,
    toggleSelect,
    selectAll,
    updateQuantity,
    updatePetQuantity,
    removeItem,
    checkout,
  } = useCart();

  const lineCount = items.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🛒 Giỏ Hàng</h1>
          <p className="text-gray-600">
            Bạn có <span className="font-bold text-gray-800">{lineCount}</span> dòng hàng trong giỏ.
          </p>
          {lineCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {productItems.length > 0 && (
                <span>
                  {productItems.length} sản phẩm
                </span>
              )}
              {productItems.length > 0 && petItems.length > 0 && <span> · </span>}
              {petItems.length > 0 && <span>{petItems.length} thú cưng</span>}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {!isAuthenticated && (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập để xem giỏ hàng</h2>
            <p className="text-gray-600 mb-6">Vui lòng đăng nhập để quản lý giỏ hàng của bạn</p>
            <Link
              to="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
            >
              Đăng nhập
            </Link>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg px-6 py-4 shadow-lg">Đang cập nhật...</div>
          </div>
        )}

        {isAuthenticated && lineCount === 0 && !loading ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-6">Chưa có sản phẩm hay thú cưng nào trong giỏ hàng</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/user/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
              >
                Mua sản phẩm
              </Link>
              <Link
                to="/user/pets"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
              >
                Xem thú cưng
              </Link>
            </div>
          </div>
        ) : isAuthenticated && lineCount > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <SelectAllBar
                items={items}
                selection={selection}
                allSelected={allSelected}
                onSelectAll={selectAll}
              />

              {petItems.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-2xl" aria-hidden>
                      🐕
                    </span>
                    Thú cưng ({petItems.length})
                  </h2>
                  <div className="space-y-3">
                    {[...petItems]
                      .sort((a, b) => (a.pet?.name ?? "").localeCompare(b.pet?.name ?? "", "vi"))
                      .map((item) => (
                        <PetCartItemRow
                          key={item.id}
                          item={item}
                          isSelected={selection[item.id] ?? true}
                          onToggleSelect={toggleSelect}
                          onRemove={removeItem}
                          updatePetQuantity={updatePetQuantity}
                        />
                      ))}
                  </div>
                </section>
              )}

              {productItems.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-2xl" aria-hidden>
                      🛒
                    </span>
                    Sản phẩm ({productItems.length})
                  </h2>
                  <div className="space-y-3">
                    {[...productItems]
                      .sort((a, b) =>
                        (a.product?.name ?? "").localeCompare(b.product?.name ?? "", "vi")
                      )
                      .map((item) => (
                        <CartItemRow
                          key={item.id}
                          item={item}
                          isSelected={selection[item.id] ?? true}
                          onToggleSelect={toggleSelect}
                          onRemove={removeItem}
                          updateQuantity={updateQuantity}
                          promotions={promotions}
                        />
                      ))}
                  </div>
                </section>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">

                <Link

                  to="/user/products"

                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition mr-6"

                >

                  ← Tiếp tục mua sắm

                </Link>

                <Link

                  to="/user/pets"

                  className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold transition"

                >

                  ← Xem thêm thú cưng

                </Link>

              </div>

            </div>



            <div className="lg:col-span-1">

              <CartSummary items={items} selection={selection} onCheckout={checkout} />

            </div>

          </div>

        ) : null}

      </div>

    </main>

  );

}
