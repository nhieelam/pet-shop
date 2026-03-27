"use client";

import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../context/authContext.tsx";

export default function UserHeader() {
  const location = useLocation();
  const {customer} = useAuth();


  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const navItem = "px-4 py-2 rounded-full transition-all duration-300 font-medium flex items-center gap-1";

  const activeItem = "bg-white text-blue-600 shadow";

  return (
      <>
        <style>
          <style>
            {`
              header {
                font-family: Fredoka, sans-serif;
              }
            `}
          </style>
        </style>
        <header
            className="sticky top-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-[#ff8e53] via-[#ff9a5a] to-[#ffb347]border-b border-white/30text-white shadow-lg transition-all duration-300"
        >
          <nav className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">

              <Link
                  to="/user/home"
                  className="flex items-center gap-2 text-2xl font-bold tracking-wide hover:scale-105 transition"
              >
                🐾 <span>Happy Pet Shop</span>
              </Link>

              <div className="hidden md:flex items-center gap-4">

                <Link
                    to="/user/products"
                    className={`${navItem} ${
                        isActive("/user/products") ? activeItem : "hover:bg-white/20"
                    }`}
                >
                  🦴 Sản phẩm
                </Link>

                <Link
                    to="/user/pets"
                    className={`${navItem} ${
                        isActive("/user/pets") ? activeItem : "hover:bg-white/20"
                    }`}
                >
                   🐾 Thú cưng
                </Link>

                <Link
                    to="/user/cart"
                    className={`${navItem} ${
                        isActive("/user/cart") ? activeItem : "hover:bg-white/20"
                    }`}
                >
                  🛒 Giỏ hàng
                </Link>

                {customer ? (
                    <Link
                        to="/user/profile"
                        className={`${navItem} ${
                            isActive("/user/profile") ? activeItem : "hover:bg-white/20"
                        }`}
                    >
                      🐶 Tài khoản
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className={`${navItem} hover:bg-white/20`}
                    >
                      🔑 Đăng nhập
                    </Link>
                )}

              </div>
            </div>

          </nav>
        </header>
      </>
  );
}