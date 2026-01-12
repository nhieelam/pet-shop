"use client";

import { useState } from "react";

interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
  availableAmount: number;
  category?: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  availableAmount,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    alert(`Đã thêm "${name}" vào giỏ hàng!`);
  };

  const handlePayment = () => {
    alert(`Thanh toán cho "${name}" - Giá: ₫${price.toLocaleString("vi-VN")}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      <a href={`/detailedProduct/${id}`} className="block">
        <div
          className="relative h-64 bg-gray-200 overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isHovered ? "blur-sm scale-105" : "blur-0 scale-100"
          }`}
        />

        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {availableAmount > 0 ? "Còn hàng" : "Hết hàng"}
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              disabled={availableAmount === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              aria-label={`Thêm ${name} vào giỏ hàng`}
            >
              <span>🛒</span> Thêm vào giỏ
            </button>
            <button
              onClick={handlePayment}
              disabled={availableAmount === 0}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              aria-label={`Thanh toán cho ${name}`}
            >
              <span>💳</span> Thanh toán
            </button>
          </div>
        )}
        </div>
      </a>

      <div className="p-4 flex-grow flex flex-col">
        <a href={`/detailedProduct/${id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </a>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        <div className="mb-4">
          <p className="text-xs text-gray-500">
            Số lượng có sẵn:{" "}
            <span
              className={`font-bold ${
                availableAmount > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {availableAmount}
            </span>
          </p>
        </div>

        <div className="border-t pt-3 mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ₫{price.toLocaleString("vi-VN")}
          </span>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={availableAmount === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Thêm ${name} vào giỏ hàng`}
              title="Thêm vào giỏ hàng"
            >
              🛒
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePayment();
              }}
              disabled={availableAmount === 0}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label={`Thanh toán cho ${name}`}
              title="Thanh toán ngay"
            >
              💳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
