export interface CategoryCreationRequest {
    name: string;
    description?: string;
}

export interface CategoryUpdateRequest {
    name: string;
    description?: string;
}

export interface CategoryResponse {
    success: boolean;
    message: string;
    data: CategoryData;
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface CategoryResponseArray {
    success: boolean;
    message: string;
    data: CategoryData[];
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface CategoryData {
    id: string;
    name: string;
    description: string;
}