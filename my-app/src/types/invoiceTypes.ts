import type { PromotionData } from "./promotionTypes";

export type PaymentMethod = "QR_Scanning" | "Cash" | "Bank_Transfer";
export type PaymentStatus = "PENDING" | "PAID" | "CANCELLED";

export interface InvoiceDetailCreationRequest {
    productId?: string;
    petId?: string;
    quantity: number;
}

export interface InvoiceCreationRequest {
    staffId: string;
    customerId: string;
    shippingAddress: string;
    paymentMethod: PaymentMethod;
    invoiceDetails: InvoiceDetailCreationRequest[];
}

/** Line item returned from POST /invoices/review */
export interface InvoiceReviewLine {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    discountAmount?: number;
    imageUrl?: string;
}

/** Preview totals + lines for checkout review */
export interface InvoiceReviewData {
    reviewDetails: InvoiceReviewLine[];
    totalAmount: number;
    realAmount: number;
}

export interface InvoiceReviewRequest {
    customerId: string;
    shippingAddress: string;
    invoiceDetails: InvoiceDetailCreationRequest[];
}

/** @deprecated Use InvoiceReviewData */
export type ReviewResponse = InvoiceReviewData;

/** @deprecated Use InvoiceDetailCreationRequest */
export type ReviewDetailRequest = InvoiceDetailCreationRequest;

export interface InvoiceResponse {
  success: boolean;
  message: string;
  data: InvoiceData;
  errorCode: number;
  status: number;
  timestamp: string;
}

export interface InvoiceResponseArray {
  success: boolean;
  message: string;
  data: InvoiceData[];
  errorCode: number;
  status: number;
  timestamp: string;
}


export interface InvoiceData {
  id: string;
  staffId: string;
  staffName: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  realAmount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  promotion: PromotionData | null;
  createdAt: string;
  updatedAt: string;
}