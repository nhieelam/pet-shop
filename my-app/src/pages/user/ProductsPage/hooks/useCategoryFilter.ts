import { useState, useCallback } from "react";

export function useCategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
  }, []);

  const resetCategoryFilter = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  return {
    selectedCategories,
    handleCategoryChange,
    resetCategoryFilter,
  };
}
