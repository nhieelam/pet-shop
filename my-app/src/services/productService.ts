import type {ProductCreationRequest, ProductResponse} from "../types/productTypes.ts";
import type {ApiResponse} from "../types/apiResponse.ts";
import {apiClient} from "../config/apiConfig.ts"
import {API_CONFIG} from "../config/apiConfig.ts";

export const createProduct = async (
    credentials: ProductCreationRequest
): Promise<ProductResponse> => {
  try {
    const res = await apiClient.post<ApiResponse<ProductResponse>>(
        API_CONFIG.ENDPOINTS.PRODUCT.CREATE,
        credentials
    );

    return res.data.data;
  } catch (error) {
    console.error("createProduct error:", error);
    throw error;
  }
};

export const getAllProducts = async (): Promise<ProductResponse[]> => {
  // await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const res = await apiClient.get<ApiResponse<ProductResponse[]>>(
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
    const res = await apiClient.get<ApiResponse<ProductResponse>>(
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
    await apiClient.delete(
        API_CONFIG.ENDPOINTS.PRODUCT.DELETE(productId)
    );
  } catch (error) {
    console.error(`deleteProduct (${productId}) error:`, error);
    throw error;
  }
};