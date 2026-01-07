"use client";

import { useState, useMemo, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

// Product interface matching the backend structure
interface Product {
  id: string;
  name: string;
  price: number;
  availableAmount: number;
  image: string;
  description: string;
  category: string;
}

// Mock product data - Replace with API call later
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Thức ăn cao cấp cho chó",
    price: 350000,
    availableAmount: 45,
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=400&h=400&fit=crop",
    description: "Dinh dưỡng hoàn chỉnh cho chó với công thức đặc biệt",
    category: "Food",
  },
  {
    id: "2",
    name: "Bộ đồ chơi cho mèo",
    price: 250000,
    availableAmount: 32,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
    description: "Bộ đồ chơi vui nhộn cho mèo với nhiều màu sắc",
    category: "Toys",
  },
  {
    id: "3",
    name: "Giường ngủ cao cấp cho chó",
    price: 500000,
    availableAmount: 18,
    image: "https://images.unsplash.com/photo-1583511655857-d19db992cb74?w=400&h=400&fit=crop",
    description: "Giường ngủ thoải mái cho thú cưng với chất liệu cao cấp",
    category: "Dog",
  },
  {
    id: "4",
    name: "Bộ spa & chăm sóc cho mèo",
    price: 450000,
    availableAmount: 27,
    image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&h=400&fit=crop",
    description: "Bộ spa chuyên nghiệp cho mèo",
    category: "Grooming",
  },
  {
    id: "5",
    name: "Dây dắt & Cổ áo cho chó",
    price: 150000,
    availableAmount: 56,
    image: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=400&fit=crop",
    description: "Dây dắt chất lượng cao với cổ áo đẹp",
    category: "Accessories",
  },
  {
    id: "6",
    name: "Cơm nước tự động cho chó",
    price: 380000,
    availableAmount: 22,
    image: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=400&h=400&fit=crop",
    description: "Cơm nước tự động thông minh",
    category: "Accessories",
  },
  {
    id: "7",
    name: "Lược chải lông cho mèo",
    price: 120000,
    availableAmount: 64,
    image: "https://images.unsplash.com/photo-1576201091160-ff2887c615a2?w=400&h=400&fit=crop",
    description: "Lược chải lông cao cấp cho mèo",
    category: "Grooming",
  },
  {
    id: "8",
    name: "Túi đựng thú cưng",
    price: 280000,
    availableAmount: 15,
    image: "https://images.unsplash.com/photo-1584714268335-bea47f396f70?w=400&h=400&fit=crop",
    description: "Túi đựng di động cho thú cưng",
    category: "Accessories",
  },
  {
    id: "9",
    name: "Thức ăn khô cho mèo",
    price: 320000,
    availableAmount: 38,
    image: "https://images.unsplash.com/photo-1548365200-ca3ea6f50189?w=400&h=400&fit=crop",
    description: "Thức ăn khô dinh dưỡng cho mèo",
    category: "Food",
  },
  {
    id: "10",
    name: "Đồ chơi bóng cho chó",
    price: 80000,
    availableAmount: 72,
    image: "https://images.unsplash.com/photo-1549685678-11ec72bef633?w=400&h=400&fit=crop",
    description: "Bóng đồ chơi cho chó với nhiều màu sắc",
    category: "Toys",
  },
  {
    id: "11",
    name: "Áo khoác cho chó",
    price: 200000,
    availableAmount: 25,
    image: "https://images.unsplash.com/photo-1548366332-bb91e28e1e68?w=400&h=400&fit=crop",
    description: "Áo khoác ấm áp cho chó vào mùa đông",
    category: "Dog",
  },
  {
    id: "12",
    name: "Nhà vệ sinh cho mèo",
    price: 180000,
    availableAmount: 30,
    image: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=400&fit=crop",
    description: "Nhà vệ sinh tự động cho mèo",
    category: "Cat",
  },
  {
    id: "13",
    name: "Thức ăn ướt cho chó",
    price: 280000,
    availableAmount: 42,
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=400&h=400&fit=crop",
    description: "Thức ăn ướt đóng hộp cho chó",
    category: "Food",
  },
  {
    id: "14",
    name: "Đồ chơi cần câu cho mèo",
    price: 95000,
    availableAmount: 58,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
    description: "Đồ chơi cần câu với lông vũ cho mèo",
    category: "Toys",
  },
  {
    id: "15",
    name: "Giường ngủ cho mèo",
    price: 420000,
    availableAmount: 20,
    image: "https://images.unsplash.com/photo-1583511655857-d19db992cb74?w=400&h=400&fit=crop",
    description: "Giường ngủ êm ái cho mèo",
    category: "Cat",
  },
  {
    id: "16",
    name: "Dầu gội cho chó",
    price: 160000,
    availableAmount: 35,
    image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&h=400&fit=crop",
    description: "Dầu gội chuyên dụng cho chó",
    category: "Grooming",
  },
  {
    id: "17",
    name: "Vòng cổ đeo cho chó",
    price: 110000,
    availableAmount: 48,
    image: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=400&fit=crop",
    description: "Vòng cổ đeo đẹp mắt cho chó",
    category: "Accessories",
  },
  {
    id: "18",
    name: "Thức ăn hữu cơ cho mèo",
    price: 390000,
    availableAmount: 28,
    image: "https://images.unsplash.com/photo-1548365200-ca3ea6f50189?w=400&h=400&fit=crop",
    description: "Thức ăn hữu cơ tự nhiên cho mèo",
    category: "Food",
  },
  {
    id: "19",
    name: "Đồ chơi xương cho chó",
    price: 75000,
    availableAmount: 65,
    image: "https://images.unsplash.com/photo-1549685678-11ec72bef633?w=400&h=400&fit=crop",
    description: "Xương đồ chơi nhai cho chó",
    category: "Toys",
  },
  {
    id: "20",
    name: "Bàn chải đánh răng cho mèo",
    price: 90000,
    availableAmount: 52,
    image: "https://images.unsplash.com/photo-1576201091160-ff2887c615a2?w=400&h=400&fit=crop",
    description: "Bàn chải đánh răng chuyên dụng cho mèo",
    category: "Grooming",
  },
];

// Available categories
const categories = ["All", "Dog", "Cat", "Food", "Toys", "Accessories", "Grooming"];

// Items per page
const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  // State management
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [sortBy, setSortBy] = useState("price-asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Filter by selected categories (if any are selected)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by search query (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategories, searchQuery, minPrice, maxPrice, sortBy]);

  // Pagination calculations
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleCategoryChange = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePriceFilterChange = useCallback((min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((sortType: string) => {
    setSortBy(sortType);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sản phẩm
          </h1>
          <p className="text-gray-600">
            Tìm kiếm và lọc sản phẩm theo nhu cầu của bạn
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoriesChange={handleCategoryChange}
              layout="sidebar"
            />

            {/* Price Filter & Sort */}
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinChange={(value) => handlePriceFilterChange(value, maxPrice)}
              onMaxChange={(value) => handlePriceFilterChange(minPrice, value)}
              onSort={handleSort}
              currentSort={sortBy}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Tabs (Mobile-friendly alternative) */}
            <div className="mb-6 lg:hidden">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoriesChange={handleCategoryChange}
                layout="tabs"
              />
            </div>

            {/* Results Header */}
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

            {/* Products Grid */}
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
              // Empty State
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Không tìm thấy sản phẩm
                </h2>
                <p className="text-gray-600 mb-6">
                  Không có sản phẩm nào phù hợp với bộ lọc của bạn.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSearchQuery("");
                    setMinPrice(0);
                    setMaxPrice(1000000);
                    setSortBy("price-asc");
                    setCurrentPage(1);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Xóa tất cả bộ lọc"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
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

