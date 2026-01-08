"use client";

import ProductCard from "./components/ProductCard";
import CategoryFilter from "./components/CategoryFilter";
import PriceFilter from "./components/PriceFilter";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import { useProductManager } from "./hooks/useProductManager";
import { mockProducts, CATEGORIES, ITEMS_PER_PAGE } from "./constants";

export default function ProductsPage() {
  const {
    selectedCategories,
    searchQuery,
    minPrice,
    maxPrice,
    sortBy,
    currentPage,
    paginatedProducts,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    handleCategoryChange,
    handleSearch,
    handlePriceFilterChange,
    handleSort,
    handlePageChange,
    resetFilters,
  } = useProductManager({
    products: mockProducts,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sản phẩm
          </h1>
          <p className="text-gray-600">
            Tìm kiếm và lọc sản phẩm theo nhu cầu của bạn
          </p>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategories={selectedCategories}
              onCategoriesChange={handleCategoryChange}
              layout="sidebar"
            />

            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinChange={(value) => handlePriceFilterChange(value, maxPrice)}
              onMaxChange={(value) => handlePriceFilterChange(minPrice, value)}
              onSort={handleSort}
              currentSort={sortBy}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 lg:hidden">
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategories={selectedCategories}
                onCategoriesChange={handleCategoryChange}
                layout="tabs"
              />
            </div>

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-gray-700">
                  Tìm thấy <span className="font-bold text-blue-600">{totalItems}</span> sản phẩm
                  {selectedCategories.length > 0 && (
                    <span> trong danh mục <span className="font-semibold">{selectedCategories.join(", ")}</span></span>
                  )}
                </p>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    availableAmount={product.availableAmount}
                    category={product.category}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Không tìm thấy sản phẩm
                </h2>
                <p className="text-gray-600 mb-6">
                  Không có sản phẩm nào phù hợp với bộ lọc của bạn.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Xóa tất cả bộ lọc"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}

            {totalItems > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

