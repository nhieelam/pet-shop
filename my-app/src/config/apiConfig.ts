const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL
)

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    ENDPOINTS: {
        AUTH: {
            LOGIN: "/auth/login",
            REGISTER: "/auth/register",
            LOGOUT: "/auth/logout",
            REFRESH: "/auth/refresh",
            INTROSPECT: "/auth/introspect",
        },

        USER: {
            CREATE: "/users",
            GET_ALL: "/users",
            GET_BY_ID: (id: string) => `/users/${id}`,
            GET_INFO: "/users/info",
            UPDATE: (id: string) => `/users/${id}`,
            UPDATE_PASSWORD: (id: string) => `/users/${id}`,
            DELETE: (id: string) => `/users/${id}`,
        },

        PRODUCT: {
            CREATE: "/products",
            CREATE_LIST: "/products/batch",
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
            UPDATE: (id: string) => `/staffs/${id}`,
            UPDATE_SHIFT: (id: string, shift: number) => `/staffs/${id}/shift?shift=${shift}`,
            DELETE: (id: string) => `/staffs/${id}`,
            GET_INFO: "/staffs/info",
            CREATE_LIST: "/staffs/batch",
        },

        CUSTOMER: {
            CREATE: "/customers",
            GET_ALL: "/customers",
            GET_BY_ID: (id: string) => `/customers/${id}`,
            GET_INFO: "/customers/info",
            UPDATE: (id: string) => `/customers/${id}`,
            ADD_POINTS: (id: string) => `/customers/${id}/points`,
            ADD_CART_ITEM: (customerId: string) => `/customers/${customerId}/items`,
            DELETE_CART_ITEM: (customerId: string, cartItemId: string) =>
                `/customers/${customerId}/items/${cartItemId}`,
            DELETE: (id: string) => `/customers/${id}`,
            ADD_PET_TO_CART: (customerId: string) => `/customers/${customerId}/items`,
        },

        INVOICE: {
            CREATE: "/invoices",
            REVIEW: "/invoices/review",
            GET_ALL: "/invoices",
            GET_BY_ID: (id: string) => `/invoices/${id}`,
            GET_BY_CUSTOMER: (customerId: string) => `/invoices/customer/${customerId}`,
            DELETE: (id: string) => `/invoices/${id}`,
            UPDATE_STATUS: (id: string) => `/invoices/${id}/status`,
            GET_CUSTOMERS: "/invoices/statistics/top-customers",
            STATISTICS_BY_YEAR:(year: number) => `/invoices/statistics/year/${year}`,
        },

        PET: {
            CREATE: "/pets",
            GET_ALL: "/pets",
            GET_BY_ID: (id: string) => `/pets/${id}`,
            PAGINATE: "/pets/paginate",
            UPDATE: (id: string) => `/pets/${id}`,
            MARK_SOLD: (id: string) => `/pets/${id}/sold`,
            DELETE: (id: string) => `/pets/${id}`,
        },

        PURCHASE: {
            CREATE: "/purchases",
            GET_ALL: "/purchases",
            GET_BY_ID: (id: string) => `/purchases/${id}`,
            DELETE: (id: string) => `/purchases/${id}`,
        },

        PROMOTION: {
            CREATE: "/promotions",
            GET_ALL: "/promotions",
            GET_BY_ID: (id: string) => `/promotions/${id}`,
            DELETE: (id: string) => `/promotions/${id}`,
        },

        SUPPLIER: {
            CREATE: "/suppliers",
            GET_ALL: "/suppliers",
            GET_BY_ID: (id: string) => `/suppliers/${id}`,
            UPDATE: (id: string) => `/suppliers/${id}`,
            DELETE: (id: string) => `/suppliers/${id}`,
        },

        CATEGORY: {
            CREATE: "/categories",
            GET_ALL: "/categories",
            GET_BY_ID: (id: string) => `/categories/${id}`,
            UPDATE: (id: string) => `/categories/${id}`,
            DELETE_BY_ID: (id: string) => `/categories/${id}`,
        },

        INVENTORY: {
            GET: "/inventories",
        },

        CART: {
            GET_CART_ITEMS: "/cart",
            ADD_CART_ITEM_TO_CART: "/cart/items",
            CREATE_CART_FOR_USER: "/cart",
            ADD_CART_ITEM: (userId: string) => `/cart/items/${userId}`,
            
        },
    },
} as const;

export const STORAGE_KEYS = {
    AUTH_TOKEN: "authToken",
    USER_NAME: "userName",
} as const;
