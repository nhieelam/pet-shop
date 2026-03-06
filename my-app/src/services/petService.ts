import { apiClient } from "../utils/apiClient";
import type {
    PetResponse,
    PetCreationRequest,
    PetUpdateRequest,
} from "../types/petTypes";
import { API_CONFIG } from "../config/apiConfig";

export const createPet = async (
    request: PetCreationRequest
): Promise<PetResponse> => {
    const res = await apiClient.post<PetResponse>(
        API_CONFIG.ENDPOINTS.PET.CREATE,
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Create pet failed");
    }
    return res.data;
};

export const getAllPets = async (): Promise<PetResponse[]> => {
    const res = await apiClient.get<PetResponse[]>(
        API_CONFIG.ENDPOINTS.PET.GET_ALL
    );
    return res.data ?? [];
};

export const getPetById = async (id: string): Promise<PetResponse> => {
    const res = await apiClient.get<PetResponse>(
        API_CONFIG.ENDPOINTS.PET.GET_BY_ID(id)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get pet failed");
    }
    return res.data;
};

export const getAllPetsPaginated = async (
    page: number,
    size: number
): Promise<PetResponse[]> => {
    const res = await apiClient.get<PetResponse[]>(
        API_CONFIG.ENDPOINTS.PET.PAGINATE,
        { params: { page, size } }
    );
    return res.data ?? [];
};

export const updatePet = async (
    id: string,
    request: PetUpdateRequest
): Promise<PetResponse> => {
    const res = await apiClient.put<PetResponse>(
        API_CONFIG.ENDPOINTS.PET.UPDATE(id),
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Update pet failed");
    }
    return res.data;
};

export const markAsSold = async (id: string): Promise<PetResponse> => {
    const res = await apiClient.patch<PetResponse>(
        API_CONFIG.ENDPOINTS.PET.MARK_SOLD(id)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Mark as sold failed");
    }
    return res.data;
};

export const deletePet = async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.PET.DELETE(id));
};
