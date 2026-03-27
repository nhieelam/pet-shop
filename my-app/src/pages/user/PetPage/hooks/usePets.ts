import { useState } from "react";
import type { PetData } from "@/types/petTypes";
import { getAllPets } from "@/services/petService";
import type { SpeciesData } from "@/types/speciesTypes";
import { getAllSpecies } from "@/services/speciesService";

export const usePets = () => {
  const [pets, setPets] = useState<PetData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [species, setSpecies] = useState<SpeciesData[]>([]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllPets();
      setPets(response.data ?? []);
    } catch (err) {
      setError("Lỗi khi tải danh sách thú cưng");
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecies = async () => {
    try {
        setLoading(true);
        const response = await getAllSpecies();
        setSpecies(response.data ?? []);
    } catch (err) {
        setError("Failed to fetch species");
    } finally {
        setLoading(false);
    }
};

  return { pets, loading, error, fetchPets, fetchSpecies, species };
};
