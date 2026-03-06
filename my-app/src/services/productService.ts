import { apiClient } from "../utils/apiClient";
import type {
    ProductResponse,
    ProductCreationRequest,
    ProductUpdateRequest,
} from "../types/productTypes";
import { API_CONFIG } from "../config/apiConfig";

export const createProduct = async (
    credentials: ProductCreationRequest
): Promise<ProductResponse> => {
    const res = await apiClient.post<ProductResponse>(
        API_CONFIG.ENDPOINTS.PRODUCT.CREATE,
        credentials
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Create product failed");
    }
    return res.data;
};

export const getAllProducts = async (): Promise<ProductResponse[]> => {
    const res = await apiClient.get<ProductResponse[]>(
        API_CONFIG.ENDPOINTS.PRODUCT.GET_ALL
    );
    return res.data ?? [];
};

export const getProductById = async (productId: string): Promise<ProductResponse> => {
    const res = await apiClient.get<ProductResponse>(
        API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_ID(productId)
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Get product failed");
    }
    return res.data;
};

export const updateProduct = async (
    productId: string,
    body: ProductUpdateRequest
): Promise<ProductResponse> => {
    const res = await apiClient.put<ProductResponse>(
        API_CONFIG.ENDPOINTS.PRODUCT.UPDATE(productId),
        body
    );
    if (!res.success || res.data == null) {
        throw new Error(res.message ?? "Update product failed");
    }
    return res.data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
    await apiClient.delete(API_CONFIG.ENDPOINTS.PRODUCT.DELETE(productId));
};

export const getAllProductsPaginated = async (
    page: number,
    size: number
): Promise<ProductResponse[]> => {
    const res = await apiClient.get<ProductResponse[]>(
        API_CONFIG.ENDPOINTS.PRODUCT.PAGINATE,
        { params: { page, size } }
    );
    return res.data ?? [];
};
