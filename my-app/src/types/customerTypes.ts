import type { UserUpdateRequest } from "./userTypes.ts";
import type { UserData } from "./userTypes.ts";
import type { CartData } from "./cartTypes.ts";
import type { InvoiceData } from "./invoiceTypes.ts";

export interface CustomerResponse {
    success: boolean;
    message: string;
    data: CustomerData;
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface CustomerResponseArray {
    success: boolean;
    message: string;
    data: CustomerData[];
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface CustomerUpdateRequest {
    user: UserUpdateRequest;
    points: number;
}
export interface CustomerData {
    id: string;
    user: UserData;
    invoices: InvoiceData[];
    points: number;
    cart: CartData;
}