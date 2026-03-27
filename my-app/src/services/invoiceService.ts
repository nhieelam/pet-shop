import type {
    InvoiceResponse,
    InvoiceCreationRequest,
    InvoiceReviewRequest,
    InvoiceReviewData,
} from "../types/invoiceTypes";

import { API_CONFIG } from "../config/apiConfig";
import { getAuthToken } from "../utils/storageUtils";

function authHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const token = getAuthToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

function unwrapPayload<T>(payload: unknown): T {
    if (
        payload &&
        typeof payload === "object" &&
        "data" in payload &&
        (payload as { data: unknown }).data !== undefined
    ) {
        return (payload as { data: T }).data;
    }
    return payload as T;
}

export const createInvoiceReview = async (
    request: InvoiceReviewRequest
): Promise<InvoiceReviewData> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INVOICE.REVIEW}`;
    const response = await fetch(url, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Không thể tải xem trước đơn hàng");
    }
    const json: unknown = await response.json();
    return unwrapPayload<InvoiceReviewData>(json);
};

export const createInvoice = async (
    request: InvoiceCreationRequest
): Promise<InvoiceResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INVOICE.CREATE}`;
    const response = await fetch(url, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Không thể tạo invoice");
    }
    const data = await response.json();
    return data;
};

export const getAllInvoices = async (): Promise<InvoiceResponse[]> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INVOICE.GET_ALL}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách invoice");
    }
    const data = await response.json();
    return data;
};

export const getInvoiceById = async (id: string): Promise<InvoiceResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INVOICE.GET_BY_ID(id)}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy invoice");
    }
    const data = await response.json();
    return data;
};

export const deleteInvoice = async (id: string): Promise<void> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INVOICE.DELETE(id)}`;
    const response = await fetch(url, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Không thể xóa invoice");
    }
    const data = await response.json();
    return data;
};
