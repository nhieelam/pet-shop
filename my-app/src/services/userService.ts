import type {
    UserResponse,
    UserCreationRequest,
    UserUpdateRequest,
    ChangePasswordRequest,
} from "../types/userTypes";
import { API_CONFIG } from "../config/apiConfig";
import { getAuthToken } from "../utils/storageUtils";

export const createUser = async (
    request: UserCreationRequest
): Promise<UserResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.CREATE}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {  
        throw new Error("Không thể tạo user");  
    }  
      
    const data = await response.json();
    return data;
};

export const getAllUsers = async (): Promise<UserResponse[]> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.GET_ALL}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách user");
    }
    const data = await response.json();
    return data;
};

export const getUserById = async (id: string): Promise<UserResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.GET_BY_ID(id)}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy user");
    }
    const data = await response.json();
    return data;
};

export const getInfo = async (): Promise<UserResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.GET_INFO}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy info user");
    }
    const data = await response.json();
    return data;
};

export const updateUser = async (
    id: string,
    request: UserUpdateRequest
): Promise<UserResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPDATE(id)}`;
    const token = getAuthToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(request),
        }
    );
    if (!response.ok) {
        throw new Error("Không thể cập nhật user");
    }
    const data = await response.json();
    return data;
};

export const updatePassword = async (
    id: string,
    request: ChangePasswordRequest
): Promise<void> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPDATE_PASSWORD(id)}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Không thể cập nhật password");
    }
    const data = await response.json();
    return data;
};

export const deleteUser = async (id: string): Promise<void> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.DELETE(id)}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể xóa user");
    }
    const data = await response.json();
    return data;
};
