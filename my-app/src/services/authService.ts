import { API_CONFIG } from "../config/apiConfig";
import type {
    AuthRequest,
    AuthResponse,
    IntrospectRequest,
    IntrospectResponse,
    LogoutRequest,
    RefreshRequest,
} from "../types/authTypes";
import {
    createLoginError,
    isNetworkError,
    isLoginError,
    ERROR_MESSAGES,
} from "../utils/errorHandler";
import { apiClient } from "../utils/apiClient";
import { removeAuthToken } from "../utils/storageUtils";

export const login = async (credentials: AuthRequest): Promise<AuthResponse> => {
    try {
        const res = await apiClient.post<AuthResponse>(
            API_CONFIG.ENDPOINTS.AUTH.LOGIN,
            credentials
        );

        if (!res.success || !res.data) {
            throw createLoginError(
                res.message || ERROR_MESSAGES.LOGIN_FAILED,
                res.status,
                res.errorCode
            );
        }

        return res.data;
    } catch (error: unknown) {
        if (isNetworkError(error)) {
            throw createLoginError(ERROR_MESSAGES.NETWORK_ERROR);
        }

        if (isLoginError(error)) {
            throw error;
        }

        throw createLoginError(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
};

export const verifyToken = async (request: IntrospectRequest): Promise<IntrospectResponse> => {
    const res = await apiClient.post<IntrospectResponse>(
        API_CONFIG.ENDPOINTS.AUTH.INTROSPECT,
        request
    );
    if (!res.success || !res.data) {
        throw new Error(res.message ?? "Introspect failed");
    }
    return res.data;
};

export const refresh = async (request: RefreshRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REFRESH,
        request
    );
    if (!res.success || !res.data) {
        throw new Error(res.message || "Refresh failed");
    }
    return res.data;
};

export const logout = async (request?: LogoutRequest) => {
    if (request?.token) {
        try {
            await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, request);
        } catch {
            // ignore errors on logout
        }
    }
    removeAuthToken();
};
