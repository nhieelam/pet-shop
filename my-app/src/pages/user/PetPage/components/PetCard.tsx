"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import type { PetData } from "@/types/petTypes";

import { getEmojiPet } from "@/utils/getEmoji";


interface PetCardProps {
  pet: PetData;
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("vi-VN");
  } catch {
    return dateStr;
  }
}

export default function PetCard({ pet }: PetCardProps) {
  const emoji = getEmojiPet(pet.speciesName);
  const [imageError, setImageError] = useState(false);
  const showSpeciesEmoji = !pet.image || !pet.image.trim() || imageError;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      <Link to={`/user/pet/${pet.id}`} className="block">
        <div className="relative h-64 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden cursor-pointer flex items-center justify-center">
          {showSpeciesEmoji ? (
            <span className="text-8xl" aria-hidden>
              {emoji}
            </span>
          ) : (
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${
              pet.available && !pet.sold
                ? "bg-green-500 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {pet.available && !pet.sold ? "Còn bán" : "Đã bán"}
          </div>
        </div>
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/user/pet/${pet.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#ff8e53] transition-colors">
            {pet.name}
          </h3>
        </Link>

        {pet.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {pet.description}
          </p>
        )}

        <div className="space-y-2 text-sm text-gray-600 mb-3">
          <p>
            <span className="font-medium">Loài:</span> {pet.speciesName}
          </p>
          <p>
            <span className="font-medium">Giống:</span> {pet.breed}
          </p>
          <p>
            <span className="font-medium">Giới tính:</span> {pet.gender}
          </p>
          <p>
            <span className="font-medium">Ngày sinh:</span> {formatDate(pet.birth)}
          </p>
          {pet.vaccinated && (
            <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
              Đã tiêm phòng
            </span>
          )}
        </div>

        <div className="border-t pt-3 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#ff8e53]">
              ₫{pet.price.toLocaleString("vi-VN")}
            </span>
            <Link
              to={`/user/pet/${pet.id}`}
              className="text-sm font-semibold text-[#ff8e53] hover:text-[#ff7a3d] transition"
            >
              Xem chi tiết →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
