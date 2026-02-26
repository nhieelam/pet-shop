import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_CONFIG } from "../../../config/apiConfig";
import { apiClient } from "../../../utils/apiClient";
import { storeAuthToken, storeUserName } from "../../../utils/storageUtils";
import { isNetworkError, ERROR_MESSAGES } from "../../../utils/errorHandler";
import type { AuthResponse } from "../../../types/authTypes";

export interface LoginErrors {
  general?: string;
  userName?: string;
  password?: string;
}

export function useLogin() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const clearError = useCallback((field: keyof LoginErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const next: LoginErrors = {};
    if (!userName.trim()) {
      next.userName = "Vui lòng nhập tên đăng nhập.";
    }
    if (!password) {
      next.password = "Vui lòng nhập mật khẩu.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [userName, password]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) return;

      setIsLoading(true);
      setErrors((prev) => ({ ...prev, general: undefined }));

      try {
        const res = await apiClient.post<AuthResponse>(
          API_CONFIG.ENDPOINTS.AUTH.LOGIN,
          { userName: userName.trim(), password }
        );

        if (res.success && res.data?.token) {
          storeAuthToken(res.data.token);
          storeUserName(userName.trim());
          navigate("/user/products", { replace: true });
          return;
        }

        const message =
          res.message || ERROR_MESSAGES.LOGIN_FAILED;
        setErrors((prev) => ({ ...prev, general: message }));
      } catch (error) {
        if (isNetworkError(error)) {
          setErrors((prev) => ({
            ...prev,
            general: ERROR_MESSAGES.NETWORK_ERROR,
          }));
        } else if (error && typeof error === "object" && "message" in error) {
          setErrors((prev) => ({
            ...prev,
            general: (error as { message: string }).message,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: ERROR_MESSAGES.UNKNOWN_ERROR,
          }));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [userName, password, validate, navigate]
  );

  return {
    userName,
    password,
    errors,
    isLoading,
    setUserName,
    setPassword,
    handleSubmit,
    clearError,
  };
}
