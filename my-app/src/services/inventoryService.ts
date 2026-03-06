import type { InventoryResponse } from "../types/inventoryTypes";
import { apiClient } from "../utils/apiClient";
import { API_CONFIG } from "../config/apiConfig";

export const getInventory = async (): Promise<InventoryResponse> => {
    const res = await apiClient.get<InventoryResponse>(
        API_CONFIG.ENDPOINTS.INVENTORY.GET
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get inventory failed");
    }
    return res.data;
};
