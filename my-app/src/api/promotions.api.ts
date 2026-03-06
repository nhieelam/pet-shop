import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type {
  PromotionResponse,
  PromotionCreationRequest,
} from "../types/promotionTypes";

export async function createPromotion(dto: PromotionCreationRequest) {
  const res = await http.post<{ data: PromotionResponse }>(
    API_CONFIG.ENDPOINTS.PROMOTION.CREATE,
    dto
  );
  return res.data;
}

export async function getAllPromotions() {
  const res = await http.get<{ data: PromotionResponse[] }>(
    API_CONFIG.ENDPOINTS.PROMOTION.GET_ALL
  );
  return res.data;
}

export async function getPromotionById(id: string) {
  const res = await http.get<{ data: PromotionResponse }>(
    API_CONFIG.ENDPOINTS.PROMOTION.GET_BY_ID(id)
  );
  return res.data;
}

export async function deletePromotion(id: string) {
  const res = await http.delete(
    API_CONFIG.ENDPOINTS.PROMOTION.DELETE(id)
  );
  return res.data;
}
