import type { StaffResponse, StaffCreationRequest, StaffResponseArray } from "../types/staffTypes";
import { API_CONFIG } from "../config/apiConfig";

export const createStaff = async (
    request: StaffCreationRequest
): Promise<StaffResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STAFF.CREATE}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Không thể tạo staff");
    }
    const data = await response.json();
    return data;
};

export const getAllStaff = async (): Promise<StaffResponseArray> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STAFF.GET_ALL}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy danh sách staff");
    }
    const data = await response.json();
    return data;
};

export const getStaffById = async (id: string): Promise<StaffResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STAFF.GET_BY_ID(id)}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy staff");
    }
    const data = await response.json();
    return data;
};

export const updateStaffShift = async (
    id: string,
    shift: number
): Promise<StaffResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STAFF.UPDATE_SHIFT(id, shift)}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể cập nhật shift");
    }
    const data = await response.json();
    return data;

};

export const deleteStaff = async (id: string): Promise<void> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STAFF.DELETE(id)}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể xóa staff");
    }
    const data = await response.json();
    return data;
};

export const getInfo = async (): Promise<StaffResponse> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STAFF.GET_INFO}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Không thể lấy info staff");
    }   
    const data = await response.json();
    return data;
};
