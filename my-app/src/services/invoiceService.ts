import { apiClient } from "../utils/apiClient";
import type {
    InvoiceResponse,
    InvoiceCreationRequest,
} from "../types/invoiceTypes";
import { API_CONFIG } from "../config/apiConfig";

export const createInvoice = async (
    request: InvoiceCreationRequest
): Promise<InvoiceResponse> => {
    const res = await apiClient.post<InvoiceResponse>(
        API_CONFIG.ENDPOINTS.INVOICE.CREATE,
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Create invoice failed");
    }
    return res.data;
};

export const getAllInvoices = async (): Promise<InvoiceResponse[]> => {
    const res = await apiClient.get<InvoiceResponse[]>(
        API_CONFIG.ENDPOINTS.INVOICE.GET_ALL
    );
    return res.data ?? [];
};

export const getInvoiceById = async (id: string): Promise<InvoiceResponse> => {
    const res = await apiClient.get<InvoiceResponse>(
        API_CONFIG.ENDPOINTS.INVOICE.GET_BY_ID(id)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get invoice failed");
    }
    return res.data;
};

export const deleteInvoice = async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.INVOICE.DELETE(id));
};
