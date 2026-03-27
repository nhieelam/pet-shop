import type {
    InvoiceResponse,
    InvoiceCreationRequest,
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

export const createInvoice = async (
    request: InvoiceCreationRequest
): Promise<InvoiceResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INVOICE.CREATE}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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

export const getInvoicesByCustomerId = async (
    customerId: string
): Promise<InvoiceResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INVOICE.GET_BY_CUSTOMER(customerId)}`;
    const response = await fetch(url, {
        method: "GET",
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách hóa đơn của khách hàng");
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
