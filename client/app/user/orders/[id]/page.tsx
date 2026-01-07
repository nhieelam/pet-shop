"use client";

import { useParams, useRouter } from "next/navigation";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Chi tiết đơn hàng
          </h1>
          <p className="text-gray-600 mb-6">
            Mã đơn hàng: <span className="font-mono font-bold">#{orderId}</span>
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-800">
              🚧 Trang chi tiết đơn hàng đang được phát triển
            </p>
          </div>

          <button
            onClick={() => router.push("/profile")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            ← Quay lại trang cá nhân
          </button>
        </div>
      </div>
    </div>
  );
}
