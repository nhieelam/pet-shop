import { apiClient } from "../utils/apiClient";
import type {
    SupplierResponse,
    SupplierCreationRequest,
    SupplierUpdateRequest,
} from "../types/supplierTypes";
import { API_CONFIG } from "../config/apiConfig";

export const createSupplier = async (
    request: SupplierCreationRequest
): Promise<SupplierResponse> => {
    const res = await apiClient.post<SupplierResponse>(
        API_CONFIG.ENDPOINTS.SUPPLIER.CREATE,
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Create supplier failed");
    }
    return res.data;
};

export const getAllSuppliers = async (): Promise<SupplierResponse[]> => {
    const res = await apiClient.get<SupplierResponse[]>(
        API_CONFIG.ENDPOINTS.SUPPLIER.GET_ALL
    );
    return res.data ?? [];
};

export const getSupplierById = async (
    id: string
): Promise<SupplierResponse> => {
    const res = await apiClient.get<SupplierResponse>(
        API_CONFIG.ENDPOINTS.SUPPLIER.GET_BY_ID(id)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get supplier failed");
    }
    return res.data;
};

export const updateSupplier = async (
    id: string,
    request: SupplierUpdateRequest
): Promise<SupplierResponse> => {
    const res = await apiClient.put<SupplierResponse>(
        API_CONFIG.ENDPOINTS.SUPPLIER.UPDATE(id),
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Update supplier failed");
    }
    return res.data;
};

export const deleteSupplier = async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.SUPPLIER.DELETE(id));
};
