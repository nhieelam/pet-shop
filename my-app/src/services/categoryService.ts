
import type {
  CategoryResponse,
  CategoryResponseArray,
  CategoryCreationRequest,
  CategoryUpdateRequest,
} from "../types/categoryTypes";
import { API_CONFIG } from "../config/apiConfig";

export const getCategoryById = async (
  id: string
): Promise<CategoryResponse> => {
const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORY.GET_BY_ID(id)}`;
const response = await fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
if (!response.ok) {
  throw new Error("Không thể lấy category");
}
const data = await response.json();
return data;
};

export const updateCategoryById = async (
  id: string,
  request: CategoryUpdateRequest
): Promise<CategoryResponse> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORY.UPDATE(id)}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
if (!response.ok) {
  throw new Error("Không thể cập nhật category");
}
const data = await response.json();
return data;
};

export const getAllCategories = async (): Promise<CategoryResponseArray> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORY.GET_ALL}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Không thể lấy danh sách category");
  }
  const data = await response.json();
  return data;
};

export const createCategory = async (
    request: CategoryCreationRequest
): Promise<CategoryResponse> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORY.CREATE}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error("Không thể tạo category");
  }
  const data = await response.json();
  return data;
};

export const deleteCategoryById = async (id: string): Promise<CategoryResponse> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORY.DELETE_BY_ID(id)}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Không thể xóa category");
  }
  const data = await response.json();
  return data;
};