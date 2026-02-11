import axios from "axios";
import type { ProductResponse, ProductCreationRequest } from "../types/productTypes.ts";
import { API_CONFIG } from "../config/apiConfig.ts";
import type { ApiResponse } from "../types/apiResponse.ts";

export const createProduct = async (
    cridentials: ProductCreationRequest
): Promise<ProductResponse> => {
    try {
        const res = await axios.post<ApiResponse<ProductResponse>>(
            API_CONFIG.ENDPOINTS.PRODUCT.CREATE,
            cridentials
        );

        return res.data.data;
    } catch (error) {
        console.error("createProduct error:", error);
        throw error;
    }
};

export const getAllProducts = async (): Promise<ProductResponse[]> => {
    try {
        const res = await axios.get<ApiResponse<ProductResponse[]>>(
            API_CONFIG.ENDPOINTS.PRODUCT.GET_ALL
        );

        return res.data.data;
    } catch (error) {
        console.error("getAllProducts error:", error);
        throw error;
    }
};

export const getProductById = async (
    productId: string
): Promise<ProductResponse> => {
    try {
        const res = await axios.get<ApiResponse<ProductResponse>>(
            API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_ID(productId)
        );

        return res.data.data;
    } catch (error) {
        console.error(`getProductById (${productId}) error:`, error);
        throw error;
    }
};

export const deleteProduct = async (
    productId: string
): Promise<void> => {
    try {
        await axios.delete(
            API_CONFIG.ENDPOINTS.PRODUCT.DELETE(productId)
        );
    } catch (error) {
        console.error(`deleteProduct (${productId}) error:`, error);
        throw error;
    }
};
