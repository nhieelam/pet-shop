import axios from "axios";

export const API_CONFIG = {
    BASE_URL: "http://localhost:8080/happy-pet-shop",
    ENDPOINTS: {
        AUTH: {
            LOGIN: "/auth/login",
            LOGOUT: "/auth/logout",
            REFRESH: "/auth/refresh",
            INTROSPECT: "/auth/introspect",
        },

        PRODUCT: {
            CREATE: "/products",
            GET_ALL: "/products",
            GET_BY_ID: (id: string) => `/products/${id}`,
            PAGINATE: "/products/paginate",
            UPDATE: (id: string) => `/products/${id}`,
            DELETE: (id: string) => `/products/${id}`,
        },

        STAFF: {
            CREATE: "/staffs",
            GET_ALL: "/staffs",
            GET_BY_ID: (id: string) => `/staffs/${id}`,
            UPDATE_SHIFT: (id: string, shift: number) => `/staffs/${id}/${shift}`,
            DELETE: (id: string) => `/staffs/${id}`,
            GET_INFO: "/staffs/info",
        },
        CUSTOMER: {
            CREATE: "/customers",
            GET_INFO: "/customers/info",
        },
        INVENTORY: {
            GET: "/inventories",
        }
    },
} as const;

export const STORAGE_KEYS = {
    AUTH_TOKEN: "authToken",
    USER_NAME: "userName",
} as const;

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
