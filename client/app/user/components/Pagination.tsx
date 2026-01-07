"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  startIndex,
  endIndex,
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      // Show ellipsis if needed
      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Show nothing if no items
  if (totalItems === 0) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      {/* Results Info */}
      <div className="text-center mb-6">
        <p className="text-gray-700 font-medium">
          Hiển thị{" "}
          <span className="font-bold text-blue-600">{startIndex + 1}</span> -{" "}
          <span className="font-bold text-blue-600">{Math.min(endIndex, totalItems)}</span> trong{" "}
          <span className="font-bold text-blue-600">{totalItems}</span> kết quả
        </p>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
          aria-label="Trang trước"
        >
          ← Trước
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-2 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                disabled={page === currentPage}
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
                aria-label={`Trang ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </div>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
          aria-label="Trang sau"
        >
          Sau →
        </button>
      </div>
    </div>
  );
}
