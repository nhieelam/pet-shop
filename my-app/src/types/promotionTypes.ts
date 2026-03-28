import type { DiscountType } from "../type/type";

export interface PromotionDetailCreationRequest {
    productId: string;
}

export interface PromotionCreationRequest {
    code: string;
    description?: string;
    discountType: DiscountType;
    discountValue: number;
    maxDiscountValue?: number;
    startDate: string;
    endDate: string;
    promotionDetails: PromotionDetailCreationRequest[];
}


export interface PromotionResponse {
    success: boolean;
    message: string;
    data: PromotionData;
    errorCode: number;
    status: number;
    timestamp: string;
}   

export interface PromotionResponseArray {
    success: boolean;
    message: string;
    data: PromotionData[];
    errorCode: number;
    status: number;
    timestamp: string;
}
export interface PromotionData {
    id: string;
    code: string;
    description : string;
    discountType: DiscountType;
    discountValue: number;
    maxDiscountValue : number;
    startDate: string;
    endDate: string;
    promotionDetails: PromotionDetail[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface PromotionDetail {
    id: string;
    productId: string;
    productName : string;
}