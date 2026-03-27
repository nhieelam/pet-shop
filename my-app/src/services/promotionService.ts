import type {
    PromotionResponse,
    PromotionCreationRequest,
} from "../types/promotionTypes";

import { API_CONFIG } from "../config/apiConfig";

export const createPromotion = async (
    request: PromotionCreationRequest
): Promise<PromotionResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROMOTION.CREATE}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Không thể tạo promotion");
    }
    const data = await response.json();
    return data;
};

export const getAllPromotions = async (): Promise<PromotionResponse[]> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROMOTION.GET_ALL}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách promotion");
    }
    const data = await response.json();
    return data;
};

export const getPromotionById = async (
    id: string
): Promise<PromotionResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROMOTION.GET_BY_ID(id)}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy promotion");
    }
    const data = await response.json();
    return data;
};

export const deletePromotion = async (id: string): Promise<void> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROMOTION.DELETE(id)}`;
    const response = await fetch(url, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Không thể xóa promotion");
    }
    const data = await response.json();
    return data;
};
