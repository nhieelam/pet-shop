"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  layout?: "sidebar" | "tabs";
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  layout = "sidebar",
}: CategoryFilterProps) {
  // Tab layout for horizontal display
  if (layout === "tabs") {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              aria-pressed={activeCategory === category}
              aria-label={`Lọc theo danh mục ${category}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Sidebar layout (default)
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Danh mục</h3>
      <div className="flex flex-col gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`text-left px-4 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            aria-pressed={activeCategory === category}
            aria-label={`Lọc theo danh mục ${category}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
