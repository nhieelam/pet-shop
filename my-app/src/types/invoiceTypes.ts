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


export interface InvoiceResponse {
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
  invoiceDetails: InvoiceDetail[];
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceDetail {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;
}