import type {
    SupplierResponse,
    SupplierResponseArray,
    SupplierCreationRequest,
    SupplierUpdateRequest,
} from "../types/supplierTypes";

import { API_CONFIG } from "../config/apiConfig";

export const createSupplier = async (
    request: SupplierCreationRequest
): Promise<SupplierResponse> => {
    const response = await fetch(
        API_CONFIG.ENDPOINTS.SUPPLIER.CREATE,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );
    if (!response.ok) {
        throw new Error("Không thể tạo supplier");
    }
    const data = await response.json();
    return data;
};

export const getAllSuppliers = async (): Promise<SupplierResponseArray> => {
    const response = await fetch(
        API_CONFIG.ENDPOINTS.SUPPLIER.GET_ALL
    );
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách supplier");
    }
    const data = await response.json();
    return data;
};

export const getSupplierById = async (
    id: string
): Promise<SupplierResponse> => {
    const response = await fetch(
        API_CONFIG.ENDPOINTS.SUPPLIER.GET_BY_ID(id)
    );
    if (!response.ok) {
        throw new Error("Không thể lấy supplier");
    }
    const data = await response.json();
    return data;
};

export const updateSupplier = async (
    id: string,
    request: SupplierUpdateRequest
): Promise<SupplierResponse> => {
    const response = await fetch(
        API_CONFIG.ENDPOINTS.SUPPLIER.UPDATE(id),{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );
    if (!response.ok) {  
        throw new Error("Không thể cập nhật supplier");  
    }   
    const data = await response.json();
    return data;
};

export const deleteSupplier = async (id: string): Promise<SupplierResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUPPLIER.DELETE(id)}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể xóa supplier");
    }
    const data = await response.json();
    return data;
};