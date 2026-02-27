export const API_CONFIG = {
    BASE_URL: "http://localhost:8080/happy-pet-shop",
    ENDPOINTS: {
        USER : {
            REGISTER: "/users/register",
            INFO: "/users/me",
        },
        AUTH: {
            LOGIN: "/auth/login", 
        },

    },
} as const;

export const STORAGE_KEYS = {
    AUTH_TOKEN: "authToken",
    USER_NAME: "userName",
} as const;
