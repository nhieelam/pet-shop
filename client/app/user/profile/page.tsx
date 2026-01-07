"use client";

import { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import AddressList from "../components/AddressList";
import InvoiceHistory from "../components/InvoiceHistory";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "addresses" | "invoices">("overview");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Hồ sơ của bạn</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân, địa chỉ và lịch sử đơn hàng</p>
        </div>

        {/* Profile Header */}
        <ProfileHeader />

        {/* Navigation Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 font-semibold transition border-b-2 ${
                activeTab === "overview"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
              aria-selected={activeTab === "overview"}
            >
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`py-4 px-2 font-semibold transition border-b-2 ${
                activeTab === "addresses"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
              aria-selected={activeTab === "addresses"}
            >
              Địa chỉ
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className={`py-4 px-2 font-semibold transition border-b-2 ${
                activeTab === "invoices"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
              aria-selected={activeTab === "invoices"}
            >
              Hóa đơn
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Thống kê nhanh</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tổng đơn hàng:</span>
                    <span className="text-2xl font-bold text-blue-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tổng chi tiêu:</span>
                    <span className="text-2xl font-bold text-green-600">₫3,450,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Đơn hàng đang chờ:</span>
                    <span className="text-2xl font-bold text-orange-600">2</span>
                  </div>
                </div>
              </div>

              {/* Member Benefits */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quyền lợi thành viên</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>Miễn phí giao hàng cho đơn hàng trên 500K</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>Tích điểm mua hàng</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>Ưu tiên hỗ trợ khách hàng VIP</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>Giảm giá đặc biệt hàng tháng</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "addresses" && <AddressList />}

          {activeTab === "invoices" && <InvoiceHistory />}
        </div>
      </div>
    </div>
  );
}
