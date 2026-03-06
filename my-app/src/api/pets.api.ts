import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type {
  PetResponse,
  PetCreationRequest,
  PetUpdateRequest,
} from "../types/petTypes";

export async function createPet(dto: PetCreationRequest) {
  const res = await http.post<{ data: PetResponse }>(
    API_CONFIG.ENDPOINTS.PET.CREATE,
    dto
  );
  return res.data;
}

export async function getAllPets() {
  const res = await http.get<{ data: PetResponse[] }>(
    API_CONFIG.ENDPOINTS.PET.GET_ALL
  );
  return res.data;
}

export async function getPetById(id: string) {
  const res = await http.get<{ data: PetResponse }>(
    API_CONFIG.ENDPOINTS.PET.GET_BY_ID(id)
  );
  return res.data;
}

export async function getPetsPaginated(page: number, size: number) {
  const res = await http.get<{ data: PetResponse[] }>(
    API_CONFIG.ENDPOINTS.PET.PAGINATE,
    { params: { page, size } }
  );
  return res.data;
}

export async function updatePet(id: string, dto: PetUpdateRequest) {
  const res = await http.put<{ data: PetResponse }>(
    API_CONFIG.ENDPOINTS.PET.UPDATE(id),
    dto
  );
  return res.data;
}

export async function markPetAsSold(id: string) {
  const res = await http.patch<{ data: PetResponse }>(
    API_CONFIG.ENDPOINTS.PET.MARK_SOLD(id)
  );
  return res.data;
}

export async function deletePet(id: string) {
  const res = await http.delete(
    API_CONFIG.ENDPOINTS.PET.DELETE(id)
  );
  return res.data;
}
