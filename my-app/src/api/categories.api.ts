import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type {
  CategoryResponse,
  CategoryCreationRequest,
  CategoryUpdateRequest,
} from "../types/categoryTypes";

export async function createCategory(dto: CategoryCreationRequest) {
  const res = await http.post<{ data: CategoryResponse }>(
    API_CONFIG.ENDPOINTS.CATEGORY.CREATE,
    dto
  );
  return res.data;
}

export async function getAllCategories() {
  const res = await http.get<{ data: CategoryResponse[] }>(
    API_CONFIG.ENDPOINTS.CATEGORY.GET_ALL
  );
  return res.data;
}

export async function getCategoryById(id: string) {
  const res = await http.get<{ data: CategoryResponse }>(
    API_CONFIG.ENDPOINTS.CATEGORY.GET_BY_ID(id)
  );
  return res.data;
}

export async function updateCategory(id: string, dto: CategoryUpdateRequest) {
  const res = await http.put<{ data: CategoryResponse }>(
    API_CONFIG.ENDPOINTS.CATEGORY.UPDATE(id),
    dto
  );
  return res.data;
}
