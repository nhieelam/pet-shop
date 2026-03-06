import { apiClient } from "../utils/apiClient";
import type {
    PromotionResponse,
    PromotionCreationRequest,
} from "../types/promotionTypes";
import { API_CONFIG } from "../config/apiConfig";

export const createPromotion = async (
    request: PromotionCreationRequest
): Promise<PromotionResponse> => {
    const res = await apiClient.post<PromotionResponse>(
        API_CONFIG.ENDPOINTS.PROMOTION.CREATE,
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Create promotion failed");
    }
    return res.data;
};

export const getAllPromotions = async (): Promise<PromotionResponse[]> => {
    const res = await apiClient.get<PromotionResponse[]>(
        API_CONFIG.ENDPOINTS.PROMOTION.GET_ALL
    );
    return res.data ?? [];
};

export const getPromotionById = async (
    id: string
): Promise<PromotionResponse> => {
    const res = await apiClient.get<PromotionResponse>(
        API_CONFIG.ENDPOINTS.PROMOTION.GET_BY_ID(id)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get promotion failed");
    }
    return res.data;
};

export const deletePromotion = async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.PROMOTION.DELETE(id));
};
