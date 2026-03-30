"use client";

import { useEffect } from "react";
import { useDetailedProduct } from "./hooks/useDetailedProduct";
import { AlertTriangle } from "lucide-react";
import Loader from "@/components/ui/loader";
import { useParams } from "react-router-dom";
import { useProductsPage } from "../ProductsPage/hooks/useProductsPage";
import { formatPrice } from "@/utils/format";



export default function DetailedProductPage() {
  const { id } = useParams();
  const { product, loading, error, fetchProduct, quantity, setQuantity  } = useDetailedProduct();
  const { handleAddToCart, cartLoading } = useProductsPage();
  
  useEffect(() => {
      fetchProduct();
  }, [id]);
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }
  if (!product ) {
    return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Không tìm thấy sản phẩm
        </h2>

        <p className="text-gray-500 mb-6">
          Sản phẩm bạn đang tìm có thể đã bị xóa hoặc không tồn tại.
        </p>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">

      {error && (
            <div className="max-w-7xl mx-auto px-4 mt-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center shadow">
                <span>{error}</span>
              </div>
            </div>
        )}
        
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-96">
                <img
                  src={product.imageUrl || ""}
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
                        product.quantity > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.quantity} sản phẩm
                    </span>
                  </p>
                  {product.quantity === 0 && (
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
                      onClick={() => setQuantity(Math.max(1, product.quantity - 1))}
                      disabled={product.quantity <= 1}
                      className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-bold py-2 px-4 rounded-lg transition"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      max={product.quantity}
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setQuantity(Math.min(Math.max(1, value), product.quantity));
                      }}
                      className="w-20 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg py-2"
                    />

                    <button
                      onClick={() =>
                        setQuantity(Math.min(quantity + 1, product.quantity))
                      }
                      disabled={quantity >= product.quantity}
                      className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-bold py-2 px-4 rounded-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>


                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                    disabled={product.quantity === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 text-lg"
                  >
                    {cartLoading ? "..." : "🛒"}
                    Thêm vào giỏ hàng
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

