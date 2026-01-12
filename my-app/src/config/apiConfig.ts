export const API_CONFIG = {
  BASE_URL: "http://localhost:8080/happy-pet-shop",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      LOGOUT: "/auth/logout",
      REFRESH: "/auth/refresh",
    },
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  USER_NAME: "userName",
} as const;
