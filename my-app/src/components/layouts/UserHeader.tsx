"use client";

import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

export default function UserHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY) {
        // scroll down
        setShowHeader(false);
      } else {
        // scroll up
        setShowHeader(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
      <header
          className={`sticky top-0 left-0 w-full z-50 bg-blue-600 text-white shadow-lg transition-all duration-300 
              ${
              showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
              }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link to="/user/products" className="text-2xl font-bold">
                🐾 Happy Pet Shop
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link
                  to="/user/products"
                  className={`hover:text-blue-200 transition duration-300 font-medium ${
                      isActive("/user/products") ? "text-blue-200 underline" : ""
                  }`}
              >
                Sản phẩm
              </Link>
              <Link
                  to="/user/services"
                  className={`hover:text-blue-200 transition duration-300 font-medium ${
                      isActive("/user/services") ? "text-blue-200 underline" : ""
                  }`}
              >
                Dịch vụ
              </Link>
              <Link
                  to="/user/cart"
                  className={`hover:text-blue-200 transition duration-300 font-medium ${
                      isActive("/user/cart") ? "text-blue-200 underline" : ""
                  }`}
              >
                🛒 Giỏ hàng
              </Link>
              <Link
                  to="/user/profile"
                  className={`hover:text-blue-200 transition duration-300 font-medium ${
                      isActive("/user/profile") ? "text-blue-200 underline" : ""
                  }`}
              >
                👤 Tài khoản
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
                aria-label="Toggle menu"
            >
              <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <div className="md:hidden pb-4">
                <Link
                    to="/user/products"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium ${
                        isActive("/user/products") ? "bg-blue-700" : ""
                    }`}
                >
                  Sản phẩm
                </Link>
                <Link
                    to="/user/services"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium ${
                        isActive("/user/services") ? "bg-blue-700" : ""
                    }`}
                >
                  Dịch vụ
                </Link>
                <Link
                    to="/user/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium ${
                        isActive("/user/cart") ? "bg-blue-700" : ""
                    }`}
                >
                  🛒 Giỏ hàng
                </Link>
                <Link
                    to="/user/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium ${
                        isActive("/user/profile") ? "bg-blue-700" : ""
                    }`}
                >
                  👤 Tài khoản
                </Link>
              </div>
          )}
        </nav>
      </header>
  );
}
