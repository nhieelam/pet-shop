"use client";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onSort: (sortType: string) => void;
  currentSort: string;
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  onSort,
  currentSort,
}: PriceFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Price Range */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Lọc theo giá</h3>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Giá tối thiểu (₫)
        </label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => onMinChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Giá tối thiểu"
          aria-label="Giá tối thiểu"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Giá tối đa (₫)
        </label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => onMaxChange(Math.max(minPrice, parseInt(e.target.value) || 1000000))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Giá tối đa"
          aria-label="Giá tối đa"
          min={minPrice}
        />
      </div>

      {/* Price Range Display */}
      <div className="mb-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Khoảng giá: <span className="font-semibold text-gray-800">₫{minPrice.toLocaleString("vi-VN")}</span> - <span className="font-semibold text-gray-800">₫{maxPrice.toLocaleString("vi-VN")}</span>
        </p>
      </div>

      {/* Quick Sort Options */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Sắp xếp</h3>
      <div className="flex flex-col gap-3">
        {[
          { label: "Giá: Thấp → Cao", value: "price-asc" },
          { label: "Giá: Cao → Thấp", value: "price-desc" },
          { label: "Tên: A → Z", value: "name-asc" },
          { label: "Tên: Z → A", value: "name-desc" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => onSort(option.value)}
            className={`text-left px-4 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              currentSort === option.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            aria-pressed={currentSort === option.value}
            aria-label={`Sắp xếp ${option.label}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
