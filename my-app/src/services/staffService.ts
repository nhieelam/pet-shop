import { apiClient } from "../utils/apiClient";
import type { StaffResponse, StaffCreationRequest } from "../types/staffTypes";
import { API_CONFIG } from "../config/apiConfig";
import { getAuthToken } from "../utils/storageUtils";

const authHeaders = () => ({
    Authorization: `Bearer ${getAuthToken()}`,
});

export const createStaff = async (
    request: StaffCreationRequest
): Promise<StaffResponse> => {
    const res = await apiClient.post<StaffResponse>(
        API_CONFIG.ENDPOINTS.STAFF.CREATE,
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Create staff failed");
    }
    return res.data;
};

export const getAllStaff = async (): Promise<StaffResponse[]> => {
    const res = await apiClient.get<StaffResponse[]>(
        API_CONFIG.ENDPOINTS.STAFF.GET_ALL
    );
    return res.data ?? [];
};

export const getStaffById = async (id: string): Promise<StaffResponse> => {
    const res = await apiClient.get<StaffResponse>(
        API_CONFIG.ENDPOINTS.STAFF.GET_BY_ID(id)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get staff failed");
    }
    return res.data;
};

export const updateStaffShift = async (
    id: string,
    shift: number
): Promise<StaffResponse> => {
    const res = await apiClient.put<StaffResponse>(
        API_CONFIG.ENDPOINTS.STAFF.UPDATE_SHIFT(id, shift)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Update shift failed");
    }
    return res.data;
};

export const deleteStaff = async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.STAFF.DELETE(id));
};

export const getInfo = async (): Promise<StaffResponse> => {
    const res = await apiClient.get<StaffResponse>(
        API_CONFIG.ENDPOINTS.STAFF.GET_INFO,
        { headers: authHeaders() }
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get info failed");
    }
    return res.data;
};
