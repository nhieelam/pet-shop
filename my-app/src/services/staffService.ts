import axios from "axios";
import type {ProductResponse, ProductCreationRequest} from "../types/productTypes";
import {API_CONFIG} from "../config/apiConfig";
import type {ApiResponse} from "../types/apiResponse";
import type {StaffResponse} from "../types/staffTypes.ts";
import {getAuthToken} from "../utils/storageUtils.ts";

export const createProduct = async (
    credentials: ProductCreationRequest
): Promise<ProductResponse> => {
    try {
        const res = await axios.post<ApiResponse<ProductResponse>>(
            API_CONFIG.ENDPOINTS.PRODUCT.CREATE,
            credentials
        );

        return res.data.data;
    } catch (error) {
        console.error("❌ createProduct error:", error);
        throw error; // để component xử lý tiếp (toast, alert…)
    }
};

export const getAllProducts = async (): Promise<ProductResponse[]> => {
    try {
        const res = await axios.get<ApiResponse<ProductResponse[]>>(
            API_CONFIG.ENDPOINTS.PRODUCT.GET_ALL
        );

        return res.data.data;
    } catch (error) {
        console.error("❌ getAllProducts error:", error);
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
        console.error(`❌ getProductById (${productId}) error:`, error);
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
        console.error(`❌ deleteProduct (${productId}) error:`, error);
        throw error;
    }
};

export const getInfo = async (): Promise<StaffResponse> => {
    const res = await axios.get<ApiResponse<StaffResponse>>(
        API_CONFIG.ENDPOINTS.STAFF.GET_INFO, {
            headers: {
                Authorization: `bearer : ${getAuthToken()}`,
            }
        });
    return res.data.data;
}
