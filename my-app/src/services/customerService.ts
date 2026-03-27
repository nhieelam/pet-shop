import type { UserCreationRequest } from "../types/userTypes";
import type { CustomerData, CustomerResponse } from "../types/customerTypes";
import { API_CONFIG } from "../config/apiConfig";
import { getAuthToken } from "../utils/storageUtils";

export const createCustomer = async (
    credentials: UserCreationRequest
): Promise<CustomerResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMER.CREATE}`;
    const response = await fetch(
        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }
    );
    if (!response.ok) {
        throw new Error("Không thể tạo customer");
    }
    const data = await response.json();
    return data as CustomerResponse;
};

/** @deprecated Use createCustomer */
export const register = createCustomer;

function unwrapCustomerList(json: unknown): CustomerData[] {
    if (Array.isArray(json)) return json as CustomerData[];
    if (json && typeof json === "object" && "data" in json) {
        const inner = (json as { data?: unknown }).data;
        if (Array.isArray(inner)) return inner as CustomerData[];
    }
    return [];
}

export const getAllCustomers = async (): Promise<CustomerData[]> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMER.GET_ALL}`;

    const response = await fetch(
        url,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách customer");
    }
    const data = await response.json();
    return unwrapCustomerList(data);
};

export const getCustomerById = async (id: string): Promise<CustomerResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMER.GET_BY_ID(id)}`;
    const response = await fetch(
        url,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!response.ok) {
        throw new Error("Không thể lấy customer");
    }
    const data = await response.json();
    return data ;
};

export const getInfo = async (): Promise<CustomerResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMER.GET_INFO}`;
    const token = getAuthToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
        throw new Error("Không thể lấy info customer");
    }
    const data = await response.json();
    return data as CustomerResponse;
};


export const addPoints = async (
    id: string,
    points: number
): Promise<CustomerResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMER.ADD_POINTS(id)}`;

    const response = await fetch(
        url,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ points }),
    });
    if (!response.ok) {
        throw new Error("Không thể thêm điểm");
    }
    const data = await response.json();
    return data as CustomerResponse;
};

export const deleteCustomer = async (id: string): Promise<void> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMER.DELETE(id)}`;

    const response = await fetch(
        url,
        {
            method: "DELETE",
        }
    );
    if (!response.ok) {
        throw new Error("Không thể xóa customer");
    }
    const data = await response.json();
    return data;
};
