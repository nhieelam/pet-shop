import { apiClient } from "../utils/apiClient";
import type {
    CategoryResponse,
    CategoryCreationRequest,
    CategoryUpdateRequest,
} from "../types/categoryTypes";
import type { ApiResponse } from "../types/apiResponse";
import { API_CONFIG } from "../config/apiConfig";

export const createCategory = async (
    request: CategoryCreationRequest
): Promise<CategoryResponse> => {
    const res = await apiClient.post<ApiResponse<CategoryResponse>>(
        API_CONFIG.ENDPOINTS.CATEGORY.CREATE,
        request
    );
    const apiRes = res.data;
    if (!apiRes.success || apiRes.data == null) {
        throw new Error(apiRes.message ?? "Create category failed");
    }
    return apiRes.data;
};

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
    const res = await apiClient.get<ApiResponse<CategoryResponse[]>>(
        API_CONFIG.ENDPOINTS.CATEGORY.GET_ALL
    );
    return res.data?.data ?? [];
};

export const getCategoryById = async (
    id: string
): Promise<CategoryResponse> => {
    const res = await apiClient.get<ApiResponse<CategoryResponse>>(
        API_CONFIG.ENDPOINTS.CATEGORY.GET_BY_ID(id)
    );
    const apiRes = res.data;
    if (!apiRes.success || apiRes.data == null) {
        throw new Error(apiRes.message ?? "Get category failed");
    }
    return apiRes.data;
};

export const updateCategoryById = async (
    id: string,
    request: CategoryUpdateRequest
): Promise<CategoryResponse> => {
    const res = await apiClient.put<ApiResponse<CategoryResponse>>(
        API_CONFIG.ENDPOINTS.CATEGORY.UPDATE(id),
        request
    );
    const apiRes = res.data;
    if (!apiRes.success || apiRes.data == null) {
        throw new Error(apiRes.message ?? "Update category failed");
    }
    return apiRes.data;
};
