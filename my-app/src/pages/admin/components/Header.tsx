"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              🐾 PetShop
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="hover:text-blue-200 transition duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="hover:text-blue-200 transition duration-300 font-medium"
            >
              Profile
            </Link>
            <Link
              href="/cart"
              className="hover:text-blue-200 transition duration-300 font-medium"
            >
              Cart
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
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
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
            >
              Profile
            </Link>
            <Link
              href="/cart"
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
            >
              Cart
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
