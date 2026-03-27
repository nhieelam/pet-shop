import { API_CONFIG } from "@/config/apiConfig";
import type { SpeciesData, SpeciesResponse, SpeciesResponseArray } from "@/types/speciesTypes";

export const getSpeciesById = async (id: string): Promise<SpeciesResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SPECIES.GET_BY_ID(id)}`;  
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy species");
    }
    const data = await response.json();
    return data ;
};


export const getAllSpecies = async (): Promise<SpeciesResponseArray> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SPECIES.GET_ALL}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy species");
    }
    const data = await response.json();
    return data ;
};

export const createSpecies = async (species: SpeciesData): Promise<SpeciesResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SPECIES.CREATE}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể tạo species");
    }
    const data = await response.json();
    return data ;
};

export const updateSpecies = async (id: string, species: SpeciesData): Promise<SpeciesResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SPECIES.UPDATE(id)}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể cập nhật species");
    }
    const data = await response.json();
    return data ;   
};

export const deleteSpecies = async (id: string): Promise<SpeciesResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SPECIES.DELETE(id)}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể xóa species");
    }
    const data = await response.json();
    return data ;
};