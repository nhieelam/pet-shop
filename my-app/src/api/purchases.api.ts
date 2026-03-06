import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type {
  PurchaseResponse,
  PurchaseCreationRequest,
} from "../types/purchaseTypes";

export async function createPurchase(dto: PurchaseCreationRequest) {
  const res = await http.post<{ data: PurchaseResponse }>(
    API_CONFIG.ENDPOINTS.PURCHASE.CREATE,
    dto
  );
  return res.data;
}

export async function getAllPurchases() {
  const res = await http.get<{ data: PurchaseResponse[] }>(
    API_CONFIG.ENDPOINTS.PURCHASE.GET_ALL
  );
  return res.data;
}

export async function getPurchaseById(id: string) {
  const res = await http.get<{ data: PurchaseResponse }>(
    API_CONFIG.ENDPOINTS.PURCHASE.GET_BY_ID(id)
  );
  return res.data;
}

export async function deletePurchase(id: string) {
  const res = await http.delete(
    API_CONFIG.ENDPOINTS.PURCHASE.DELETE(id)
  );
  return res.data;
}
