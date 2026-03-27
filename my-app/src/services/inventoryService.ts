import type { InventoryResponse } from "../types/inventoryTypes";
import { API_CONFIG } from "../config/apiConfig";

export const getInventory = async (): Promise<InventoryResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INVENTORY.GET}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy inventory");
    }
    const data = await response.json();
    return data as InventoryResponse;
};
