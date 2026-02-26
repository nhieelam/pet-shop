// utils/getApiMessage.ts
import axios, { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
  code?: string | number;
  error?: string;
  errors?: Record<string, string>;
}

export function getApiMessage(error: unknown): string {
  // Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // Server responded with a status code
    if (axiosError.response) {
      const data = axiosError.response.data;

      // If backend sends structured error
      if (data?.message) return data.message;

      if (data?.error) return data.error;

      if (data?.code) return `Error code: ${data.code}`;

      return `Request failed with status ${axiosError.response.status}`;
    }

    // No response (network error / CORS / server down)
    if (axiosError.request) {
      return "Cannot connect to server. Please try again later.";
    }

    return axiosError.message;
  }

  // Normal JS error
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}