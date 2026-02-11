import type { InventoryResponse } from "./inventoryTypes";

export interface CartItemResponse {
    id: string;
    inventory: InventoryResponse;
    quantity: number;
}

export interface CartResponse {
    id: string;
    cartItems: CartItemResponse[];
    createdAt: string;
    updatedAt: string;
}
