import { apiClient } from "../utils/apiClient";
import type {
    UserResponse,
    UserCreationRequest,
    UserUpdateRequest,
    ChangePasswordRequest,
} from "../types/userTypes";
import { API_CONFIG } from "../config/apiConfig";
import { getAuthToken } from "../utils/storageUtils";

const authHeaders = () => ({
    Authorization: `Bearer ${getAuthToken()}`,
});

export const createUser = async (
    request: UserCreationRequest
): Promise<UserResponse> => {
    const res = await apiClient.post<UserResponse>(
        API_CONFIG.ENDPOINTS.USER.CREATE,
        request,
        authHeaders()
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Create user failed");
    }
    return res.data;
};

export const getAllUsers = async (): Promise<UserResponse[]> => {
    const res = await apiClient.get<UserResponse[]>(
        API_CONFIG.ENDPOINTS.USER.GET_ALL,
        { headers: authHeaders() }
    );
    return res.data ?? [];
};

export const getUserById = async (id: string): Promise<UserResponse> => {
    const res = await apiClient.get<UserResponse>(
        API_CONFIG.ENDPOINTS.USER.GET_BY_ID(id),
        { headers: authHeaders() }
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get user failed");
    }
    return res.data;
};

export const getInfo = async (): Promise<UserResponse> => {
    const res = await apiClient.get<UserResponse>(
        API_CONFIG.ENDPOINTS.USER.GET_INFO,
        { headers: authHeaders() }
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get info failed");
    }
    return res.data;
};

export const updateUser = async (
    id: string,
    request: UserUpdateRequest
): Promise<UserResponse> => {
    const res = await apiClient.put<UserResponse>(
        API_CONFIG.ENDPOINTS.USER.UPDATE(id),
        request,
        authHeaders()
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Update user failed");
    }
    return res.data;
};

export const updatePassword = async (
    id: string,
    request: ChangePasswordRequest
): Promise<void> => {
    const res = await apiClient.post(
        API_CONFIG.ENDPOINTS.USER.UPDATE_PASSWORD(id),
        request,
        authHeaders()
    );
    if (!res.success) {
        throw new Error(res.message ?? "Update password failed");
    }
};

export const deleteUser = async (id: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.USER.DELETE(id), authHeaders());
};
