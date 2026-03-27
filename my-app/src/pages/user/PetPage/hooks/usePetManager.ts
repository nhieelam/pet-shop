import { useState, useMemo, useCallback } from "react";
import type { PetData } from "@/types/petTypes";
import { usePriceFilter } from "@/pages/user/ProductsPage/hooks/usePriceFilter";
import { usePagination } from "@/pages/user/ProductsPage/hooks/usePagination";
import { useSort } from "@/pages/user/ProductsPage/hooks/useSort";
import { useSearch } from "@/pages/user/ProductsPage/hooks/useSearch";
import type { SpeciesData } from "@/types/speciesTypes";

type SpeciesFilterOption = string[];

interface UsePetManagerOptions {
  pets: PetData[];
  species: SpeciesData[];
  itemsPerPage?: number;
}

const DEFAULT_ITEMS_PER_PAGE = 12;

export function usePetManager({
  pets,
  species,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UsePetManagerOptions) {
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesFilterOption>([]);
  const { searchQuery, handleSearch: baseHandleSearch, resetSearch } = useSearch();

  const {
    minPrice,
    maxPrice,
    handlePriceFilterChange: baseHandlePriceFilterChange,
    resetPriceFilter,
  } = usePriceFilter();

  const { sortBy, handleSort: baseHandleSort, resetSort } = useSort();

  const filteredAndSortedPets = useMemo(() => {
    let filtered = [...pets].filter((pet) => pet.available && !pet.sold);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((pet) =>
        pet.name.toLowerCase().includes(query)
      );
    }

    if (selectedSpecies.length > 0) {
      filtered = filtered.filter((pet) =>
        selectedSpecies.includes(pet.speciesName)
      );
    }

    filtered = filtered.filter(
      (pet) => pet.price >= minPrice && pet.price <= maxPrice
    );

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
  }, [pets, searchQuery, selectedSpecies, minPrice, maxPrice, sortBy]);

  const {
    currentPage,
    paginatedItems: paginatedPets,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    resetPage,
  } = usePagination(filteredAndSortedPets, itemsPerPage);

  const handleSearch = useCallback(
    (query: string) => {
      baseHandleSearch(query);
      resetPage();
    },
    [baseHandleSearch, resetPage]
  );

  const handleSpeciesChange = useCallback((species: string[]) => {
    setSelectedSpecies(species);
    resetPage();
  }, [resetPage]);

  const handlePriceFilterChange = useCallback(
    (min: number, max: number) => {
      baseHandlePriceFilterChange(min, max);
      resetPage();
    },
    [baseHandlePriceFilterChange, resetPage]
  );

  const handleSort = useCallback(
    (sortType: string) => {
      baseHandleSort(sortType);
      resetPage();
    },
    [baseHandleSort, resetPage]
  );

  const resetFilters = useCallback(() => {
    setSelectedSpecies([]);
    resetPriceFilter();
    resetSort();
    resetPage();
  }, [resetPriceFilter, resetSort, resetPage]);

  const speciesList = useMemo(
    () => species.map((s) => s.name).filter(Boolean),
    [species]
  );

  return {
    minPrice,
    maxPrice,
    sortBy,
    currentPage,
    selectedSpecies,
    speciesList,
    filteredAndSortedPets,
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
  };
}
