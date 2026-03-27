"use client";

import type { CartItemResponse } from "@/types/cartTypes";
import { useEffect, useRef, useState } from "react";

interface PetCartItemRowProps {
  item: CartItemResponse;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onRemove: (id: string) => void;
  updatePetQuantity: (petId: string, newQuantity: number) => void;
}

export default function PetCartItemRow({
  item,
  isSelected,
  onToggleSelect,
  onRemove,
  updatePetQuantity,
}: PetCartItemRowProps) {
  const pet = item.pet;
  const price = pet?.price ?? 0;
  const name = pet?.name ?? "Thú cưng";
  const image = pet?.imageUrl ?? "";
  const lineTotal = price * item.quantity;
  const [quantity, setQuantity] = useState(item.quantity);
  const updatePetQuantityRef = useRef(updatePetQuantity);
  updatePetQuantityRef.current = updatePetQuantity;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  /** Debounce API: do not list `updatePetQuantity` in deps — it changes when cart `items` updates after fetch and would retrigger this effect in a loop. */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!pet?.id) return;
      if (quantity === item.quantity) return;
      updatePetQuantityRef.current(pet.id, quantity);
    }, 500);
    return () => clearTimeout(timer);
  }, [quantity, pet?.id, item.quantity]);

  if (!pet?.id) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white border border-amber-100 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="flex-shrink-0 pt-0.5">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(item.id)}
            className="w-5 h-5 text-amber-600 rounded cursor-pointer focus:ring-2 focus:ring-amber-500"
            aria-label={`Chọn ${name}`}
          />
        </div>

        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 bg-amber-50 rounded-lg overflow-hidden flex items-center justify-center">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl" aria-hidden>
                🐕
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Thú cưng</p>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {pet.species && <span>{pet.species} · </span>}
            Giá: <span className="font-semibold text-gray-800">{formatCurrency(price)}</span>
          </p>
          <p className="text-sm font-bold text-gray-800 mt-2 sm:hidden">{formatCurrency(lineTotal)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 pl-9 sm:pl-0">
        <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuantity((q) => Math.max(0, q - 1));
            }}
            disabled={quantity <= 0}
            className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-gray-700 font-bold"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold text-gray-800" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuantity((q) => q + 1);
            }}
            className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-amber-100 transition text-gray-700 font-bold"
          >
            +
          </button>
        </div>

        <div className="hidden sm:block text-right min-w-[6rem]">
          <p className="text-sm font-bold text-gray-800">{formatCurrency(lineTotal)}</p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition flex-shrink-0"
          aria-label={`Xóa ${name} khỏi giỏ hàng`}
          title="Xóa khỏi giỏ hàng"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
