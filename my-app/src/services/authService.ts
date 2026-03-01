import type {AuthRequest, AuthResponse, IntrospectRequest, IntrospectResponse} from "../types/authTypes";
import {
  createLoginError,
  isNetworkError,
  isLoginError,
  ERROR_MESSAGES,
} from "../utils/errorHandler";
import type {ApiResponse} from "../types/apiResponse.ts";
import {removeAuthToken} from "../utils/storageUtils.ts";
import axios from "axios";
import {API_CONFIG, apiClient} from "../config/apiConfig.ts";

export const login = async (
    credentials: AuthRequest
): Promise<AuthResponse> => {
  try {
    const res = await apiClient.post<ApiResponse<AuthResponse>>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
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

    // Network error
    if (isNetworkError(error)) {
      throw createLoginError(ERROR_MESSAGES.NETWORK_ERROR);
    }

    // Lỗi đã chuẩn hoá trước đó
    if (isLoginError(error)) {
      throw error;
    }

    // Axios error (4xx, 5xx)
    if (axios.isAxiosError(error)) {
      throw createLoginError(
          error.response?.data?.message || ERROR_MESSAGES.LOGIN_FAILED,
          error.response?.status,
          error.response?.data?.errorCode
      );
    }

    throw createLoginError(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

export const verifyToken = async (request: IntrospectRequest): Promise<IntrospectResponse> => {

  const res = await apiClient.post<ApiResponse<IntrospectResponse>>(
      API_CONFIG.ENDPOINTS.AUTH.INTROSPECT,
      request
  );

  return res.data.data;
};

export const logout = () => {
  removeAuthToken();
};

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

