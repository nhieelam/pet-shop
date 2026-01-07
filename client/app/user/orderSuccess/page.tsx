"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Get order details from URL params
    const id = searchParams.get("orderId");
    const total = searchParams.get("total");
    
    if (!id) {
      // If no orderId, redirect to home (invalid access)
      router.push("/");
      return;
    }

    setOrderId(id);
    if (total) {
      setOrderTotal(parseFloat(total));
    }

    // Clear checkout data from sessionStorage
    sessionStorage.removeItem("checkoutItems");
    sessionStorage.removeItem("checkoutProduct");

    // Hide confetti after animation
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Đang tải...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: [
                    "#10B981",
                    "#3B82F6",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",
                  ][Math.floor(Math.random() * 5)],
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
          {/* Header Section with Success Icon */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-12 text-center relative">
            {/* Animated Success Icon */}
            <div className="mb-6 relative inline-block">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-scaleIn">
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              {/* Pulse Ring Effect */}
              <div className="absolute inset-0 w-24 h-24 bg-white rounded-full animate-ping opacity-20"></div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 animate-fadeIn">
              Cảm ơn bạn! 🎉
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-green-50 animate-fadeIn animation-delay-200">
              Đơn hàng của bạn đã được đặt thành công
            </p>
          </div>

          {/* Order Details Section */}
          <div className="px-8 py-8">
            {/* Order Info */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Mã đơn hàng</p>
                  <p className="text-2xl font-bold text-gray-800 font-mono">
                    #{orderId}
                  </p>
                </div>
                {orderTotal && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Tổng tiền</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(orderTotal)}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Status Badge */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-300">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Đang xử lý
                </span>
              </div>
            </div>

            {/* Information Message */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5 mb-8">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 mb-2">
                    Thông tin quan trọng
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>
                        Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ email của bạn
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>
                        Đơn hàng sẽ được xử lý và giao trong vòng 2-3 ngày làm việc
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>
                        Bạn có thể theo dõi trạng thái đơn hàng trong trang "Đơn hàng của tôi"
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Primary Button - View Order Detail */}
              <button
                onClick={() => router.push(`/orders/${orderId}`)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Xem chi tiết đơn hàng
              </button>

              {/* Secondary Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Continue Shopping */}
                <button
                  onClick={() => router.push("/products")}
                  className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Tiếp tục mua sắm
                </button>

                {/* Back to Home */}
                <button
                  onClick={() => router.push("/")}
                  className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Về trang chủ
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Thanh toán an toàn & bảo mật
              </p>
              <p>
                Cần hỗ trợ?{" "}
                <a href="/support" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Liên hệ chúng tôi
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Bạn có câu hỏi về đơn hàng?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/faq"
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Câu hỏi thường gặp
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Trung tâm hỗ trợ
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="/profile"
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Tài khoản của tôi
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confetti-fall 3s linear forwards;
        }

        .confetti-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </main>
  );
}
