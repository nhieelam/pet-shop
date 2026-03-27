import { useState, useCallback } from "react";

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

const VALID_SORT_OPTIONS: SortOption[] = [
  "price-asc",
  "price-desc",
  "name-asc",
  "name-desc",
];

export function useSort(defaultSort: SortOption = "price-asc") {
  const [sortBy, setSortBy] = useState<SortOption>(defaultSort);

  const handleSort = useCallback((sortType: string) => {
    if (VALID_SORT_OPTIONS.includes(sortType as SortOption)) {
      setSortBy(sortType as SortOption);
    }
  }, []);

  const resetSort = useCallback(() => {
    setSortBy(defaultSort);
  }, [defaultSort]);

  return { sortBy, handleSort, resetSort };
}
