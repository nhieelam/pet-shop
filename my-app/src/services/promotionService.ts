import type {
    PromotionCreationRequest,
    PromotionData,
    PromotionResponse,
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

function unwrapPromotionList(json: unknown): PromotionData[] {
    if (Array.isArray(json)) return json as PromotionData[];
    if (json && typeof json === "object" && "data" in json) {
        const inner = (json as { data?: unknown }).data;
        if (Array.isArray(inner)) return inner as PromotionData[];
    }
    return [];
}

function unwrapPromotionEntity(json: unknown): PromotionData {
    if (json && typeof json === "object" && "data" in json && (json as { data: PromotionData }).data) {
        return (json as { data: PromotionData }).data;
    }
    return json as PromotionData;
}

export const getAllPromotions = async (): Promise<PromotionData[]> => {
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
    return unwrapPromotionList(data);
};

export const getPromotionById = async (id: string): Promise<PromotionData> => {
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
    return unwrapPromotionEntity(data);
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
