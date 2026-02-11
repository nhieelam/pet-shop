import type {InventoryResponse} from "../types/inventoryTypes.ts";
import axios from "axios";
import type {ApiResponse} from "../types/apiResponse.ts";
import {API_CONFIG} from "../config/apiConfig.ts";

export const getInventory = async (): Promise<InventoryResponse> => {
    const res = await axios.get<ApiResponse<InventoryResponse>>(API_CONFIG.ENDPOINTS.INVENTORY.GET);

    return res.data.data;
}