import { apiClient } from "../utils/apiClient";
import type {
    CategoryResponse,
    CategoryCreationRequest,
    CategoryUpdateRequest,
} from "../types/categoryTypes";
import { API_CONFIG } from "../config/apiConfig";

export const createCategory = async (
    request: CategoryCreationRequest
): Promise<CategoryResponse> => {
    const res = await apiClient.post<CategoryResponse>(
        API_CONFIG.ENDPOINTS.CATEGORY.CREATE,
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Create category failed");
    }
    return res.data;
};

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
    const res = await apiClient.get<CategoryResponse[]>(
        API_CONFIG.ENDPOINTS.CATEGORY.GET_ALL
    );
    return res.data ?? [];
};

export const getCategoryById = async (
    id: string
): Promise<CategoryResponse> => {
    const res = await apiClient.get<CategoryResponse>(
        API_CONFIG.ENDPOINTS.CATEGORY.GET_BY_ID(id)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get category failed");
    }
    return res.data;
};

export const updateCategoryById = async (
    id: string,
    request: CategoryUpdateRequest
): Promise<CategoryResponse> => {
    const res = await apiClient.put<CategoryResponse>(
        API_CONFIG.ENDPOINTS.CATEGORY.UPDATE(id),
        request
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Update category failed");
    }
    return res.data;
};
