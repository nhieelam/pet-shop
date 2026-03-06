import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type { InventoryResponse } from "../types/inventoryTypes";

export async function getInventory() {
  const res = await http.get<{ data: InventoryResponse }>(
    API_CONFIG.ENDPOINTS.INVENTORY.GET
  );
  return res.data;
}
