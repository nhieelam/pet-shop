export enum UserRole {
    CUSTOMER = "USER",
    STAFF = "STAFF",
    ADMIN = "ADMIN",
}

export type PaymentMethod = "QR_Scanning" | "COD" ;
export type PaymentStatus = "PENDING" | "PAID" | "CANCELLED" | "REFUNDED" | "FAILED" | "SUCCESS";
export type DiscountType = "PERCENT" | "FIXED";

export type SortOption = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";


