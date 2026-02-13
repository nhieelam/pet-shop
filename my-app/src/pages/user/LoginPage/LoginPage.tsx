"use client";

import {useEffect} from "react";
import {useLogin} from "./useLogin";
import Loader from "../../../components/ui/loader";

export default function LoginPage() {
  const {
    userName,
    password,
    errors,
    isLoading,
    setUserName,
    setPassword,
    handleSubmit,
    clearError,
  } = useLogin();

  // 🔒 Chặn scroll khi loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
      <div
          className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12 relative">

        {/* 🔥 Overlay Loader */}
        {isLoading && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <Loader/>
            </div>
        )}

        <div
            className={`w-full max-w-md transition ${
                isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-600 mb-2">🐾</h1>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Đăng Nhập
              </h2>
              <p className="text-gray-600">
                Chào mừng bạn quay lại Happy Pet Shop
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="text-sm font-semibold">{errors.general}</p>
                  </div>
              )}

              {/* Username */}
              <div>
                <label
                    htmlFor="userName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tên Đăng Nhập
                </label>
                <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      clearError("userName");
                    }}
                    placeholder="Nhập username của bạn"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        errors.userName
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                    }`}
                />
                {errors.userName && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.userName}
                    </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mật khẩu
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError("password");
                    }}
                    placeholder="Nhập mật khẩu của bạn"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                        errors.password
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                    }`}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.password}
                    </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-400 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                  Ghi nhớ tôi
                </span>
                </label>
                <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Quên mật khẩu?
                </a>
              </div>

              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">hoặc</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <a
                    href="/register"
                    className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  Đăng ký ngay
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}