"use client";

import { useState } from "react";
import CartItemRow from "@/app/components/CartItemRow";
import CartSummary from "@/app/components/CartSummary";
import SelectAllBar from "@/app/components/SelectAllBar";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isSelected: boolean;
}

// Mock cart data with actual pet products
const mockCartItems: CartItem[] = [
  {
    id: "prod_001",
    name: "Dog Food Premium - Thức ăn chó cao cấp",
    price: 450000,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=200&h=200&fit=crop",
    isSelected: true,
  },
  {
    id: "prod_002",
    name: "Cat Bed - Giường mèo êm ái",
    price: 280000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=200&h=200&fit=crop",
    isSelected: true,
  },
  {
    id: "prod_003",
    name: "Dog Leash - Dây xích chó chất lượng cao",
    price: 95000,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=200&h=200&fit=crop",
    isSelected: false,
  },
  {
    id: "prod_004",
    name: "Pet Toys Set - Bộ đồ chơi thú cưng",
    price: 180000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop",
    isSelected: true,
  },
  {
    id: "prod_005",
    name: "Pet Grooming Kit - Bộ vệ sinh thú cưng",
    price: 320000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=200&h=200&fit=crop",
    isSelected: false,
  },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);

  // Handle toggle item selection
  const handleToggleSelect = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  // Handle select all items
  const handleSelectAll = (selectAll: boolean) => {
    setItems(items.map((item) => ({ ...item, isSelected: selectAll })));
  };

  // Handle increment quantity
  const handleIncrement = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle decrement quantity (don't go below 0)
  const handleDecrement = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    );
  };

  // Handle remove item
  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Handle checkout
  const handleCheckout = () => {
    const selectedItems = items.filter((item) => item.isSelected);
    
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    // Store selected items in sessionStorage for payment page
    sessionStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
    
    // Navigate to payment page with source parameter
    window.location.href = "/payment?source=cart";
  };

  // Check if all items are selected
  const allSelected = items.length > 0 && items.every((item) => item.isSelected);

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
                onSelectAll={handleSelectAll}
              />

              {/* Cart Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onToggleSelect={handleToggleSelect}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onRemove={handleRemove}
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
              <CartSummary items={items} onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
