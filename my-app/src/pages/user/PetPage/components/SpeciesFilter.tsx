"use client";

import { useState } from "react";

const INITIAL_VISIBLE = 4;

interface SpeciesFilterProps {
  species: string[];
  selectedSpecies: string[];
  onSpeciesChange: (species: string[]) => void;
}

export default function SpeciesFilter({
  species,
  selectedSpecies,
  onSpeciesChange,
}: SpeciesFilterProps) {
  const [showMore, setShowMore] = useState(false);
  const visibleSpecies = showMore
    ? species
    : species.slice(0, INITIAL_VISIBLE);
  const hasMore = species.length > INITIAL_VISIBLE;

  const handleToggleSpecies = (s: string) => {
    if (selectedSpecies.includes(s)) {
      onSpeciesChange(selectedSpecies.filter((sp) => sp !== s));
    } else {
      onSpeciesChange([...selectedSpecies, s]);
    }
  };

  const handleClearAll = () => {
    onSpeciesChange([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Loài</h3>
        {selectedSpecies.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-[#ff8e53] hover:text-[#ff7a3d] font-medium transition"
          >
            Xóa
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {visibleSpecies.map((s) => (
          <label
            key={s}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition"
          >
            <input
              type="checkbox"
              checked={selectedSpecies.includes(s)}
              onChange={() => handleToggleSpecies(s)}
              className="w-5 h-5 text-[#ff8e53] rounded focus:ring-2 focus:ring-[#ff8e53] cursor-pointer"
            />
            <span
              className={`font-medium ${
                selectedSpecies.includes(s) ? "text-[#ff8e53] font-semibold" : "text-gray-800"
              }`}
            >
              {s}
            </span>
          </label>
        ))}
        {hasMore && (
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="text-sm text-[#ff8e53] hover:text-[#ff7a3d] font-medium transition mt-1"
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    </div>
  );
}
