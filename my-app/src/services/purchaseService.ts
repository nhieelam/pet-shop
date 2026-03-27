
import type {
    PurchaseDetailResponse,
    PurchaseCreationRequest,
    PurchaseResponse,
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

function unwrapListPayload(json: unknown): PurchaseResponse[] {
    if (Array.isArray(json)) return json as PurchaseResponse[];
    if (json && typeof json === "object" && "data" in json) {
        const inner = (json as { data?: unknown }).data;
        if (Array.isArray(inner)) return inner as PurchaseResponse[];
    }
    return [];
}

export const getAllPurchases = async (): Promise<PurchaseResponse[]> => {
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
    return unwrapListPayload(data);
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
