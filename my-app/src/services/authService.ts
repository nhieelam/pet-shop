import { API_CONFIG } from "../config/apiConfig";
import type {AuthRequest, AuthResponse, IntrospectRequest, IntrospectResponse} from "../types/authTypes";
import axios from "axios";
import {
  createLoginError,
  isNetworkError,
  isLoginError,
  ERROR_MESSAGES,
} from "../utils/errorHandler";
import type {ApiResponse} from "../types/apiResponse.ts";
import {removeAuthToken} from "../utils/storageUtils.ts";

export const login = async (cridentials: AuthRequest): Promise<AuthResponse> => {
    try {
        const res = await axios.post<ApiResponse<AuthResponse>>(
            API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.AUTH.LOGIN,
            cridentials
        );

        // Backend trả về nhưng logic fail
        if (!res.data.success || !res.data.data) {
            throw createLoginError(
                res.data.message || ERROR_MESSAGES.LOGIN_FAILED,
                res.data.status,
                res.data.errorCode
            );
        }

        return res.data.data;
    } catch (error: unknown) {
        // Lỗi network (mất mạng, timeout, server down)
        if (isNetworkError(error)) {
            throw createLoginError(ERROR_MESSAGES.NETWORK_ERROR);
        }

        // Lỗi đã được chuẩn hoá trước đó (do mình throw)
        if (isLoginError(error)) {
            throw error;
        }

        // Lỗi backend axios (4xx, 5xx nhưng chưa map)
        if (axios.isAxiosError(error)) {
            throw createLoginError(
                error.response?.data?.message || ERROR_MESSAGES.LOGIN_FAILED,
                error.response?.status,
                error.response?.data?.errorCode
            );
        }

        // Lỗi không xác định
        throw createLoginError(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
};

export const verifyToken = async (request: IntrospectRequest): Promise<IntrospectResponse> => {
    const res = await axios.post<ApiResponse<IntrospectResponse>>(API_CONFIG.ENDPOINTS.AUTH.INTROSPECT, request);

    return res.data.data;
}

export const logout = () => {
    removeAuthToken();
}

// export async function login(credentials: AuthRequest): Promise<AuthResponse> {
//   try {
//     const response = await apiClient.post<AuthResponse>(
//       API_CONFIG.ENDPOINTS.AUTH.LOGIN,
//       credentials
//     );
//
//     if (response.success && response.data) {
//       return response.data;
//     }
//
//     throw createLoginError(
//       response.message || ERROR_MESSAGES.LOGIN_FAILED,
//       response.status,
//       response.errorCode
//     );
//   } catch (error) {
//     if (isNetworkError(error)) {
//       throw createLoginError(ERROR_MESSAGES.NETWORK_ERROR);
//     }
//
//     if (isLoginError(error)) {
//       throw error;
//     }
//
//     throw createLoginError(ERROR_MESSAGES.UNKNOWN_ERROR);
//   }
// }

