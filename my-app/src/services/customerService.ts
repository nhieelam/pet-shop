import type { UserCreationRequest } from "../types/userTypes";
import type { CustomerResponse } from "../types/customerTypes";
import { apiClient } from "../utils/apiClient";
import { API_CONFIG } from "../config/apiConfig";
import { getAuthToken } from "../utils/storageUtils";

const authHeaders = () => ({
    Authorization: `Bearer ${getAuthToken()}`,
});

export const createCustomer = async (
    credentials: UserCreationRequest
): Promise<CustomerResponse> => {
    const res = await apiClient.post<CustomerResponse>(
        API_CONFIG.ENDPOINTS.CUSTOMER.CREATE,
        credentials
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Đăng ký thất bại");
    }
    return res.data;
};

/** @deprecated Use createCustomer */
export const register = createCustomer;

export const getAllCustomers = async (): Promise<CustomerResponse[]> => {
    const res = await apiClient.get<CustomerResponse[]>(
        API_CONFIG.ENDPOINTS.CUSTOMER.GET_ALL
    );
    return res.data ?? [];
};

export const getCustomerById = async (id: string): Promise<CustomerResponse> => {
    const res = await apiClient.get<CustomerResponse>(
        API_CONFIG.ENDPOINTS.CUSTOMER.GET_BY_ID(id),
        { headers: authHeaders() }
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get customer failed");
    }
    return res.data;
};

export const getInfo = async (): Promise<CustomerResponse> => {
    const res = await apiClient.get<CustomerResponse>(
        API_CONFIG.ENDPOINTS.CUSTOMER.GET_INFO,
        { headers: authHeaders() }
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get info failed");
    }
    return res.data;
};

export const addPoints = async (
    id: string,
    points: number
): Promise<CustomerResponse> => {
    const endpoint = `${API_CONFIG.ENDPOINTS.CUSTOMER.ADD_POINTS(id)}?points=${points}`;
    const res = await apiClient.post<CustomerResponse>(endpoint, null, authHeaders());
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Add points failed");
    }
    return res.data;
};

export const deleteCustomer = async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.CUSTOMER.DELETE(id), authHeaders());
};
