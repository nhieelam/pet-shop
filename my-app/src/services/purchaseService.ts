
import type {
    PurchaseDetailResponse,
    PurchaseCreationRequest,
} from "../types/purchaseTypes";
import { API_CONFIG } from "../config/apiConfig";

export const createPurchase = async (
    request: PurchaseCreationRequest
): Promise<PurchaseDetailResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PURCHASE.CREATE}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Không thể tạo purchase");
    }
    const data = await response.json();
    return data;
};

export const getAllPurchases = async (): Promise<PurchaseDetailResponse[]> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PURCHASE.GET_ALL}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách purchase");
    }
    const data = await response.json();
    return data;
};

export const getPurchaseById = async (id: string): Promise<PurchaseDetailResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PURCHASE.GET_BY_ID(id)}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy purchase");
    }
    const data = await response.json();
    return data;
};

export const deletePurchase = async (id: string): Promise<PurchaseDetailResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PURCHASE.DELETE(id)}`;
    const response = await fetch(url, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Không thể xóa purchase");
    }
    const data = await response.json();
    return data;
};
