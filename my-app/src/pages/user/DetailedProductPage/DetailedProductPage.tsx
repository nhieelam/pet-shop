"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductDetail } from "./hooks/useDetailedProduct";

interface Product {
  id: string;
  name: string;
  price: number;
  availableAmount: number;
  imageUrl : string;
  description?: string;
}


export default function DetailedProductPage() {
  const { id } = useParams();

  const productId = id;
  const [product, setProduct] = useState<Product | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {



  }, [productId]);

  const handleAddToCart = () => {

  };



  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Không tìm thấy sản phẩm</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">

            <div className="flex flex-col gap-4">

              <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-96">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-zoom-in"
                />
              </div>

            </div>


            <div className="flex flex-col justify-between">
              <div>

                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>


                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    ₫{formatPrice(product.price)}
                  </span>
                </div>


                <div className="mb-6">
                  <p className="text-lg text-gray-700">
                    Số lượng có sẵn:{" "}
                    <span
                      className={`font-bold text-xl ${
                        product.availableAmount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.availableAmount} sản phẩm
                    </span>
                  </p>
                  {product.availableAmount === 0 && (
                    <p className="text-red-600 font-semibold mt-2">
                      Sản phẩm đã hết hàng
                    </p>
                  )}
                </div>


                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Số lượng:
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-bold py-2 px-4 rounded-lg transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.availableAmount}
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setQuantity(Math.min(Math.max(1, value), product.availableAmount));
                      }}
                      className="w-20 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg py-2"
                    />
                    <button
                      onClick={() =>
                        setQuantity(Math.min(quantity + 1, product.availableAmount))
                      }
                      disabled={quantity >= product.availableAmount}
                      className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-bold py-2 px-4 rounded-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>


                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.availableAmount === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 text-lg"
                  >
                    <span>🛒</span>
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={product.availableAmount === 0}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 text-lg"
                  >
                    <span>💳</span>
                    Thanh toán ngay
                  </button>
                </div>


                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">
                      Tổng tiền:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₫{formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Mô tả sản phẩm
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description || "Chưa có mô tả cho sản phẩm này."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

