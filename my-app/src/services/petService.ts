
import type {
    PetResponse,
    PetResponseArray,
    PetCreationRequest,
    PetUpdateRequest,
} from "../types/petTypes";

import { API_CONFIG } from "../config/apiConfig";

export const createPet = async (
    request: PetCreationRequest
): Promise<PetResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PET.CREATE}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Không thể tạo pet");
    }
    const data = await response.json();
    return data;
};

export const getAllPets = async (): Promise<PetResponseArray> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PET.GET_ALL}`;
    const response = await fetch(
        url,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách pet");
    }
    const data = await response.json();
    return data;
};

export const getPetById = async (id: string): Promise<PetResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PET.GET_BY_ID(id)}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy thông tin pet");
    }
    const data = await response.json();
    return data;
};

export const getAllPetsPaginated = async (
    page: number,
    size: number
): Promise<PetResponse[]> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PET.PAGINATE}`;
    const response = await fetch(
        url,
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, size }),
    });
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách pet");
    }
    const data = await response.json();
    return data;
};

export const updatePet = async (
    id: string,
    request: PetUpdateRequest
): Promise<PetResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PET.UPDATE(id)}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Không thể cập nhật pet");
    }
    const data = await response.json();
    return data;
};

export const markAsSold = async (id: string): Promise<PetResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PET.MARK_SOLD(id)}`;
    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể đánh dấu pet đã bán");
    }
    const data = await response.json();
    return data;
};

export const deletePet = async (id: string): Promise<void> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PET.DELETE(id)}`;
    const response = await fetch(url, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Không thể xóa pet");
    }
    const data = await response.json();
    return data;
};
