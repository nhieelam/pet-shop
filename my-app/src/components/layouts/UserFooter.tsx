"use client";

import { Link } from "react-router-dom";

export default function UserFooter() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="text-xl font-bold mb-4">Về chúng tôi</h4>
            <p className="text-gray-400">
              Happy Pet Shop - Địa chỉ tin cậy cung cấp sản phẩm và dịch vụ chất lượng cao cho thú cưng của bạn.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Liên kết nhanh</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/user/products" className="hover:text-white transition">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/user/services" className="hover:text-white transition">
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link to="/user/cart" className="hover:text-white transition">
                  Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-bold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/user/profile" className="hover:text-white transition">
                  Tài khoản
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Chính sách đổi trả
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4">Liên hệ</h4>
            <ul className="text-gray-400 space-y-2">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:info@happypetshop.com" className="hover:text-white transition">
                  info@happypetshop.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a href="tel:0123456789" className="hover:text-white transition">
                  0123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2026 Happy Pet Shop. Bảo lưu mọi quyền.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                🐦
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
