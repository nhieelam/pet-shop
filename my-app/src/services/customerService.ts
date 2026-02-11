import type {UserCreationRequest} from "../types/userTypes.ts";
import type {CustomerResponse} from "../types/customerTypes.ts";
import axios from "axios";
import type {ApiResponse} from "../types/apiResponse.ts";
import {API_CONFIG} from "../config/apiConfig.ts";
import {getAuthToken} from "../utils/storageUtils.ts";

export const register = async (
    credentials: UserCreationRequest
): Promise<CustomerResponse> => {
    try {
        const res = await axios.post<ApiResponse<CustomerResponse>>(
            API_CONFIG.ENDPOINTS.CUSTOMER.CREATE,
            credentials
        );

        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ?? "Đăng ký thất bại"
            );
        }
        throw error;
    }
};

export const getInfo = async (): Promise<CustomerResponse> => {
    const res = await axios.get<ApiResponse<CustomerResponse>>(
        API_CONFIG.ENDPOINTS.CUSTOMER.GET_INFO,
        {
            headers: {
                Authorization: `Bearer ${getAuthToken}`
            }
        }
        );

    return res.data.data;
}