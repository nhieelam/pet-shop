import { useEffect, useState, useMemo } from "react";
import { getAllPets } from "../../../services/petService";
import type { PetData } from "../../../types/petTypes";
import axios from "axios";

export function usePet() {
    const [pets, setPets] = useState<PetData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [selectedPet, setSelectedPet] = useState<PetData | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getAllPets();
          setPets(data.data);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            setError( "Lỗi từ server");
          } else {
            setError("Không thể tải danh sách thú cưng");
          }
          setPets([]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const filteredPets = useMemo(() => {
      if (!search.trim()) return pets;
      const q = search.toLowerCase().trim();
      return pets.filter(
        (p) =>
          (p.name ?? "").toLowerCase().includes(q) ||
          (p.species ?? "").toLowerCase().includes(q) ||
          (p.breed ?? "").toLowerCase().includes(q)
      );
    }, [pets, search]);
    

    return { 
        filteredPets, 
        loading, 
        error, 
        search, 
        setSearch, 
        selectedPet, 
        setSelectedPet,
        setError,
    };
}