"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  availableAmount: number;
  image: string;
  description?: string;
}

interface ListProductsProps {
  products?: Product[];
}

export default function ListProducts({ products }: ListProductsProps) {
  // Default products if none provided
  const defaultProducts: Product[] = [
    {
      id: 1,
      name: "Thức ăn cao cấp cho chó",
      price: 350000,
      availableAmount: 45,
      image: "https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=400&h=400&fit=crop",
      description: "Dinh dưỡng hoàn chỉnh cho chó",
    },
    {
      id: 2,
      name: "Bộ đồ chơi cho mèo",
      price: 250000,
      availableAmount: 32,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
      description: "Bộ đồ chơi vui nhộn cho mèo",
    },
    {
      id: 3,
      name: "Giường ngủ cao cấp",
      price: 500000,
      availableAmount: 18,
      image: "https://images.unsplash.com/photo-1583511655857-d19db992cb74?w=400&h=400&fit=crop",
      description: "Giường ngủ thoải mái cho thú cưng",
    },
    {
      id: 4,
      name: "Bộ spa & chăm sóc",
      price: 450000,
      availableAmount: 27,
      image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&h=400&fit=crop",
      description: "Bộ spa chuyên nghiệp",
    },
    {
      id: 5,
      name: "Dây dắt & Cổ áo",
      price: 150000,
      availableAmount: 56,
      image: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=400&fit=crop",
      description: "Dây dắt chất lượng cao",
    },
    {
      id: 6,
      name: "Cơm nước tự động",
      price: 380000,
      availableAmount: 22,
      image: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=400&h=400&fit=crop",
      description: "Cơm nước tự động thông minh",
    },
    {
      id: 7,
      name: "Lược chải lông",
      price: 120000,
      availableAmount: 64,
      image: "https://images.unsplash.com/photo-1576201091160-ff2887c615a2?w=400&h=400&fit=crop",
      description: "Lược chải lông cao cấp",
    },
    {
      id: 8,
      name: "Túi đựng thú cưng",
      price: 280000,
      availableAmount: 15,
      image: "https://images.unsplash.com/photo-1584714268335-bea47f396f70?w=400&h=400&fit=crop",
      description: "Túi đựng di động cho thú cưng",
    },
  ];

  const productList = products || defaultProducts;
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const handlePayment = (product: Product) => {
    alert(`Thanh toán cho ${product.name} - Giá: ₫${product.price.toLocaleString("vi-VN")}`);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  return (
    <div className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Sản phẩm nổi bật
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div
                className="relative h-64 overflow-hidden bg-gray-200 cursor-pointer"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    hoveredId === product.id ? "blur-sm scale-105" : "blur-0 scale-100"
                  }`}
                />

                {/* Overlay with Buttons - Show on Hover */}
                {hoveredId === product.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-all duration-300">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.availableAmount === 0}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <span>🛒</span> Thêm vào giỏ
                    </button>
                    <button
                      onClick={() => handlePayment(product)}
                      disabled={product.availableAmount === 0}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <span>💳</span> Thanh toán
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Name */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14">
                  {product.name}
                </h3>

                {/* Stock Info */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Số lượng có sẵn:{" "}
                    <span
                      className={`font-bold ${
                        product.availableAmount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.availableAmount} {product.availableAmount === 1 ? "sản phẩm" : "sản phẩm"}
                    </span>
                  </p>
                </div>

                {/* Price */}
                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ₫{formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {productList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Không có sản phẩm nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
