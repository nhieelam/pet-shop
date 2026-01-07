"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

// Types
interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: {
    color?: string;
    size?: string;
  };
}

interface Address {
  id: string;
  label: string;
  phone: string;
  fullAddress: string;
  isDefault: boolean;
}

// Mock addresses - same as AddressList component
const mockAddresses: Address[] = [
  {
    id: "addr_001",
    label: "Yên Nhi",
    phone: "(+84) 793 472 637",
    fullAddress: "506/49/60C, Lạc Long Quân, Phường 5, Quận 11, TP. Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: "addr_002",
    label: "Lâm Thái Yên Nhi",
    phone: "(+84) 793 472 637",
    fullAddress: "568/5/21, Phường 5, Quận 11, TP. Hồ Chí Minh",
    isDefault: false,
  },
  {
    id: "addr_003",
    label: "Anh Chánh",
    phone: "(+84) 983 028 691",
    fullAddress: "Tòa Nhà Landmark, tòa nhà, 756a Âu Cơ, Phường 14, Quận Tân Bình, TP. Hồ Chí Minh",
    isDefault: false,
  },
];

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isSelectingAddress, setIsSelectingAddress] = useState(false);
  const [loading, setLoading] = useState(true);

  // New address form
  const [newAddress, setNewAddress] = useState({
    label: "",
    phone: "",
    fullAddress: "",
  });

  useEffect(() => {
    // Get checkout data from URL params or sessionStorage
    const source = searchParams.get("source"); // "cart" or "product"
    
    if (source === "cart") {
      // Load selected items from sessionStorage (set by cart page)
      const cartData = sessionStorage.getItem("checkoutItems");
      if (cartData) {
        setCheckoutItems(JSON.parse(cartData));
      }
    } else if (source === "product") {
      // Load single product from sessionStorage (set by product detail page)
      const productData = sessionStorage.getItem("checkoutProduct");
      if (productData) {
        setCheckoutItems([JSON.parse(productData)]);
      }
    }

    // Set default address
    const defaultAddr = addresses.find((addr) => addr.isDefault);
    if (defaultAddr) {
      setSelectedAddress(defaultAddr);
    }

    setLoading(false);
  }, [searchParams, addresses]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Calculate totals
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shippingFee;

  // Handle quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCheckoutItems(
      checkoutItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle add new address
  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.phone || !newAddress.fullAddress) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ!");
      return;
    }

    const addr: Address = {
      id: `addr_${Date.now()}`,
      label: newAddress.label,
      phone: newAddress.phone,
      fullAddress: newAddress.fullAddress,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, addr]);
    setSelectedAddress(addr);
    setNewAddress({ label: "", phone: "", fullAddress: "" });
    setIsAddingAddress(false);
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Vui lòng chọn địa chỉ giao hàng!");
      return;
    }

    if (checkoutItems.length === 0) {
      alert("Không có sản phẩm nào để thanh toán!");
      return;
    }

    // TODO: Replace with actual API call to POST /api/orders
    // Simulate API call
    try {
      // Mock order creation
      const mockOrderId = `ORD${Date.now().toString().slice(-8)}`;
      
      // In production, this would be:
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     items: checkoutItems,
      //     address: selectedAddress,
      //     total: total,
      //   })
      // });
      // const data = await response.json();
      // const orderId = data.orderId;

      // Redirect to success page with order details
      router.push(`/orderSuccess?orderId=${mockOrderId}&total=${total}`);
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Không có sản phẩm nào để thanh toán
          </h2>
          <p className="text-gray-600 mb-6">
            Vui lòng quay lại giỏ hàng hoặc chọn sản phẩm
          </p>
          <button
            onClick={() => router.push("/cart")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            💳 Thanh Toán
          </h1>
          <p className="text-gray-600">Hoàn tất đơn hàng của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column: Products + Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📦</span>
                Sản phẩm ({checkoutItems.length})
              </h2>
              <div className="space-y-4">
                {checkoutItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 mb-1 truncate">
                        {item.name}
                      </h3>
                      
                      {/* Variant Info */}
                      {item.variant && (
                        <div className="text-sm text-gray-600 mb-2">
                          {item.variant.color && (
                            <span className="mr-3">Màu: {item.variant.color}</span>
                          )}
                          {item.variant.size && (
                            <span>Size: {item.variant.size}</span>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="text-blue-600 font-bold">
                          {formatCurrency(item.price)}
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">SL:</span>
                          <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg transition"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-semibold min-w-[2.5rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1 hover:bg-gray-100 rounded-r-lg transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="text-sm text-gray-600 mt-2">
                        Tổng:{" "}
                        <span className="font-bold text-gray-800">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span>📍</span>
                  Địa chỉ giao hàng
                </h2>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsSelectingAddress(true)}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Thay đổi
                  </button>
                )}
              </div>

              {/* No Address State */}
              {!selectedAddress && addresses.length === 0 && !isAddingAddress && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    Bạn chưa có địa chỉ giao hàng
                  </p>
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    Thêm địa chỉ mới
                  </button>
                </div>
              )}

              {/* Selected Address Display */}
              {selectedAddress && !isAddingAddress && !isSelectingAddress && (
                <div className="border border-gray-300 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {selectedAddress.label}
                    </h3>
                    {selectedAddress.isDefault && (
                      <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-1">{selectedAddress.phone}</p>
                  <p className="text-gray-600">{selectedAddress.fullAddress}</p>
                </div>
              )}

              {/* Address Selection Modal */}
              {isSelectingAddress && !isAddingAddress && (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setIsSelectingAddress(false);
                      }}
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        selectedAddress?.id === addr.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-blue-400 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-800">{addr.label}</h3>
                        {addr.isDefault && (
                          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                            Mặc định
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm mb-1">{addr.phone}</p>
                      <p className="text-gray-600 text-sm">{addr.fullAddress}</p>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Thêm địa chỉ mới
                    </button>
                    <button
                      onClick={() => setIsSelectingAddress(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}

              {/* Add Address Form */}
              {isAddingAddress && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên người nhận
                    </label>
                    <input
                      type="text"
                      value={newAddress.label}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, label: e.target.value })
                      }
                      placeholder="VD: Nguyễn Văn A"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phone: e.target.value })
                      }
                      placeholder="VD: 0123456789"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Địa chỉ đầy đủ
                    </label>
                    <textarea
                      value={newAddress.fullAddress}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          fullAddress: e.target.value,
                        })
                      }
                      placeholder="VD: 123 Đường ABC, Phường XYZ, Quận 1, TP. HCM"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddAddress}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Lưu địa chỉ
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingAddress(false);
                        setIsSelectingAddress(false);
                        setNewAddress({ label: "", phone: "", fullAddress: "" });
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Tóm tắt đơn hàng
              </h2>

              {/* Summary Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(shippingFee)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                <span className="text-lg font-bold text-gray-800">
                  Tổng cộng:
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={!selectedAddress}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 disabled:hover:scale-100 text-lg"
              >
                Đặt hàng
              </button>

              {/* Info */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                Bằng việc đặt hàng, bạn đồng ý với{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Điều khoản sử dụng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
