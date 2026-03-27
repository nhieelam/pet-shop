import type { CartRequest, CartResponse, PetCartRequest } from "../types/cartTypes";

import { API_CONFIG } from "../config/apiConfig";
import { getAuthToken } from "../utils/storageUtils";

function authHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const token = getAuthToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

export const getCartItems = async (): Promise<CartResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.GET_CART_ITEMS}`;
    const response = await fetch(url, {
        method: "GET",
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error("Không thể lấy giỏ hàng");
    }
    const data = await response.json();
    return data as CartResponse;
}

export const addCartItemToCart = async (customerId: string, request: CartRequest): Promise<CartResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMER.ADD_CART_ITEM(customerId)}`;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(request ),
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
    }
    const data = await response.json();
    return data as CartResponse;
};

export const deleteCartItem = async (cartItemId: string): Promise<CartResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.DELETE_CART_ITEM}/${cartItemId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error("Không thể xóa sản phẩm khỏi giỏ hàng");
    }
    const data = await response.json();
    return data as CartResponse;
}

export const createCartForUser = async (): Promise<CartResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.CREATE_CART_FOR_USER}`;
    const response = await fetch(url, {
        method: "POST",
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error("Không thể tạo giỏ hàng");
    }
    const data = await response.json();
    return data as CartResponse;
};

export const addCartItem = async (customerId: string, request: CartRequest): Promise<CartResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMER.ADD_CART_ITEM(customerId)}`;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
    }
    const data = await response.json();
    return data as CartResponse;
};

export const addPetToCart = async (customerId: string, request: PetCartRequest): Promise<CartResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMER.ADD_PET_TO_CART(customerId)}`;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error("Không thể thêm thú cưng vào giỏ hàng");
    }
    const data = await response.json();
    return data as CartResponse;
};