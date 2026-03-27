import type { ProductData } from "./productTypes.ts";
import type { PetData } from "./petTypes.ts";

export interface CartRequest {
    productId: string;
    quantity: number;
}

export interface PetCartRequest {
    petId: string;
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
    product: ProductData | null;
    pet: PetData | null;
    quantity: number;
}

export type CartItemResponse = CartItem;
