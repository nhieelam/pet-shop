"use client";

import { useEffect } from "react";
import PetCard from "@/pages/user/PetPage/components/PetCard";
import SpeciesFilter from "@/pages/user/PetPage/components/SpeciesFilter";
import PriceFilter from "@/components/ui/PriceFilter";
import Pagination from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import { usePets } from "@/pages/user/PetPage/hooks/usePets";
import { usePetManager } from "@/pages/user/PetPage/hooks/usePetManager";
import Loader from "@/components/ui/loader";

export default function PetPage() {
  const ITEMS_PER_PAGE = 12;
  const { pets, loading, error, fetchPets, fetchSpecies, species } = usePets();

  useEffect(() => {
    fetchPets();
    fetchSpecies();
  }, []);

  const {
    selectedSpecies,
    speciesList,
    minPrice,
    maxPrice,
    sortBy,
    currentPage,
    paginatedPets,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    handleSearch,
    handleSpeciesChange,
    handlePriceFilterChange,
    handleSort,
    handlePageChange,
    resetFilters,
  } = usePetManager({ pets, species, itemsPerPage: ITEMS_PER_PAGE });

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-body">
      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center shadow">
            <span>{error}</span>
            <button
              onClick={fetchPets}
              className="ml-4 text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Thú cưng</h1>
          <p className="mt-1 text-gray-600">Khám phá những người bạn đáng yêu</p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="Tìm kiếm thú cưng..." />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <SpeciesFilter
                species={speciesList}
                selectedSpecies={selectedSpecies}
                onSpeciesChange={handleSpeciesChange}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5">
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinChange={(value) => handlePriceFilterChange(value, maxPrice)}
                onMaxChange={(value) => handlePriceFilterChange(minPrice, value)}
                onSort={handleSort}
                currentSort={sortBy}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 text-lg">
                Tìm thấy{" "}
                <span className="font-bold text-[#ff8e53]">{totalItems}</span>{" "}
                thú cưng
              </p>
            </div>

            {paginatedPets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {paginatedPets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🐾</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Không tìm thấy thú cưng
                </h2>
                <p className="text-gray-600 mb-6">
                  Không có thú cưng nào phù hợp với bộ lọc của bạn.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#ff8e53] hover:bg-[#ff7a3d] text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}

            {totalItems > 0 && (
              <div className="mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  startIndex={startIndex}
                  endIndex={endIndex}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
    </div>
  );
}
