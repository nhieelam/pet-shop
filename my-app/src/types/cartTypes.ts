import type { ProductData } from "./productTypes.ts";

export interface CartRequest {
    productId: string;
    quantity: number;
}

export interface CartResponse {
    success: boolean;
    message: string;
    data: CartData;
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface CartData {
    id: string;
    cartItems: CartItem[];
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    id: string;
    product: ProductData;
    quantity: number;
}

/** Alias for cart UI (legacy name) */
export type CartItemResponse = CartItem;
