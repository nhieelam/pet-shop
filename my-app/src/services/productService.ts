import { apiClient } from "../utils/apiClient";
import type {
    ProductResponse,
    ProductCreationRequest,
    ProductUpdateRequest,
} from "../types/productTypes";
import type { ApiResponse } from "../types/apiResponse";
import { API_CONFIG } from "../config/apiConfig";

export const createProduct = async (
    credentials: ProductCreationRequest
): Promise<ProductResponse> => {
    const res = await apiClient.post<ApiResponse<ProductResponse>>(
        API_CONFIG.ENDPOINTS.PRODUCT.CREATE,
        credentials
    );
    const apiRes = res.data;
    if (!apiRes.success || apiRes.data == null) {
        throw new Error(apiRes.message ?? "Create product failed");
    }
    return apiRes.data;
};

export const getAllProducts = async (): Promise<ProductResponse[]> => {
    const res = await apiClient.get<ApiResponse<ProductResponse[]>>(
        API_CONFIG.ENDPOINTS.PRODUCT.GET_ALL
    );
    return res.data?.data ?? [];
};

export const getProductById = async (productId: string): Promise<ProductResponse> => {
    const res = await apiClient.get<ApiResponse<ProductResponse>>(
        API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_ID(productId)
    );
    const apiRes = res.data;
    if (!apiRes.success || apiRes.data == null) {
        throw new Error(apiRes.message ?? "Get product failed");
    }
    return apiRes.data;
};

export const updateProduct = async (
    productId: string,
    body: ProductUpdateRequest
): Promise<ProductResponse> => {
    const res = await apiClient.put<ApiResponse<ProductResponse>>(
        API_CONFIG.ENDPOINTS.PRODUCT.UPDATE(productId),
        body
    );
    const apiRes = res.data;
    if (!apiRes.success || apiRes.data == null) {
        throw new Error(apiRes.message ?? "Update product failed");
    }
    return apiRes.data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.PRODUCT.DELETE(productId));
};

export const getAllProductsPaginated = async (
    page: number,
    size: number
): Promise<ProductResponse[]> => {
    const res = await apiClient.get<ApiResponse<ProductResponse[]>>(
        API_CONFIG.ENDPOINTS.PRODUCT.PAGINATE,
        { params: { page, size } }
    );
    return res.data?.data ?? [];
};
