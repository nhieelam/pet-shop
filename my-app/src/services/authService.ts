import { API_CONFIG } from "../config/apiConfig";
import type { AuthRequest, AuthResponse } from "../types/authTypes";
import { apiClient } from "../utils/apiClient";
import {
  createLoginError,
  isNetworkError,
  isLoginError,
  ERROR_MESSAGES,
} from "../utils/errorHandler";


export async function login(credentials: AuthRequest): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw createLoginError(
      response.message || ERROR_MESSAGES.LOGIN_FAILED,
      response.status,
      response.errorCode
    );
  } catch (error) {
    if (isNetworkError(error)) {
      throw createLoginError(ERROR_MESSAGES.NETWORK_ERROR);
    }

    if (isLoginError(error)) {
      throw error;
    }

    throw createLoginError(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
}
