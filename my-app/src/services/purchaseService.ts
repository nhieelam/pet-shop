import { apiClient } from "../utils/apiClient";
import type {
    PurchaseResponse,
    PurchaseCreationRequest,
} from "../types/purchaseTypes";
import { API_CONFIG } from "../config/apiConfig";

export const createPurchase = async (
    request: PurchaseCreationRequest
): Promise<PurchaseResponse> => {
    const res = await apiClient.post<PurchaseResponse>(
        API_CONFIG.ENDPOINTS.PURCHASE.CREATE,
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Create purchase failed");
    }
    return res.data;
};

export const getAllPurchases = async (): Promise<PurchaseResponse[]> => {
    const res = await apiClient.get<PurchaseResponse[]>(
        API_CONFIG.ENDPOINTS.PURCHASE.GET_ALL
    );
    return res.data ?? [];
};

export const getPurchaseById = async (id: string): Promise<PurchaseResponse> => {
    const res = await apiClient.get<PurchaseResponse>(
        API_CONFIG.ENDPOINTS.PURCHASE.GET_BY_ID(id)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get purchase failed");
    }
    return res.data;
};

export const deletePurchase = async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.PURCHASE.DELETE(id));
};
