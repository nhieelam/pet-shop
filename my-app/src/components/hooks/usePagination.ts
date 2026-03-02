import { useState, useMemo } from "react";

export type SortOption = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export interface Invoice {
  id: string;
  date: string;
  status: "Paid" | "Pending" | "Cancelled";
  totalAmount: number;
  items: number;
}
interface UsePaginationReturn {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    startIndex: number;
    totalCount: number;
}

export const usePagination = (length: number, itemsPerPage: number = 5): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);



  const totalPages = Math.ceil(length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    startIndex,
    totalCount: length
  };
};