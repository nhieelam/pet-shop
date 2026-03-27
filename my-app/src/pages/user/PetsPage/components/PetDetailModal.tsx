"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { addPetToCart } from "@/services/cartService";
import type { PetData } from "../../../../types/petTypes";
import type { CustomerData } from "@/types/customerTypes";
import type { CartResponse } from "@/types/cartTypes";

interface PetDetailModalProps {
  pet: PetData | null;
  isOpen: boolean;
  onClose: () => void;
}

function mergeCartIntoCustomer(customer: CustomerData, cartRes: CartResponse): CustomerData {
  return {
    ...customer,
    cart: cartRes.data,
  } as CustomerData;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value ?? 0);
}

function formatDate(s: string): string {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("vi-VN");
  } catch {
    return s;
  }
}

export default function PetDetailModal({ pet, isOpen, onClose }: PetDetailModalProps) {
  const { customer, setCustomer, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen || !pet) return null;

  const available = pet.available !== false && !pet.sold;

  const handleAddToCart = async () => {
    if (!customer?.id) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const cartRes = await addPetToCart(customer.id, {
        petId: pet.id,
        quantity: 1,
      });
      setCustomer(mergeCartIntoCustomer(customer, cartRes));
      setSuccess("Đã thêm vào giỏ hàng.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể thêm vào giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pet-detail-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id="pet-detail-title" className="text-xl font-bold text-gray-800">
            Chi tiết thú cưng
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <div className="mb-5">
            <div className="relative h-72 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
              {pet.image ? (
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-8xl text-gray-300" aria-hidden>
                  🐕
                </span>
              )}
              <div
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  available ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"
                }`}
              >
                {available ? "Còn hàng" : "Đã bán"}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{pet.name ?? "—"}</h3>
              <p className="text-gray-600">
                {pet.speciesName ?? "—"} · {pet.breed ?? "—"}
              </p>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-gray-500">Giới tính</dt>
                <dd className="font-medium text-gray-800">{pet.gender ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Ngày sinh</dt>
                <dd className="font-medium text-gray-800">{formatDate(pet.birth ?? "")}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Tiêm phòng</dt>
                <dd className="font-medium text-gray-800">
                  {pet.vaccinated ? "✅ Đã tiêm phòng" : "⚠️ Chưa tiêm phòng"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Tình trạng</dt>
                <dd className="font-medium text-gray-800">
                  {available ? "Còn hàng" : "Đã bán"}
                </dd>
              </div>
            </dl>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-500 text-sm mb-1">Giá</p>
              <p className="text-2xl font-bold text-[#ff8e53]">
                {formatCurrency(pet.price ?? 0)}
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">{error}</div>
            )}
            {success && (
              <div className="rounded-lg bg-emerald-50 text-emerald-800 text-sm px-3 py-2">{success}</div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              {!isAuthenticated ? (
                <p className="text-sm text-gray-600">
                  <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                    Đăng nhập
                  </Link>{" "}
                  để thêm thú cưng vào giỏ hàng.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleAddToCart()}
                  disabled={!available || loading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-white bg-[#ff8e53] hover:bg-[#ff7a38] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Đang thêm..." : "Thêm vào giỏ hàng"}
                </button>
              )}
              {isAuthenticated && (
                <Link
                  to="/user/cart"
                  className="block text-center text-sm text-blue-600 font-semibold hover:underline"
                  onClick={onClose}
                >
                  Xem giỏ hàng
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
