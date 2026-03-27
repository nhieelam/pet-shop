import { useState, useCallback } from "react";

export function useSearch(initialQuery = "") {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const resetSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return { searchQuery, setSearchQuery, handleSearch, resetSearch };
}
