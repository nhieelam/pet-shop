import type { PaymentMethod, PaymentStatus } from "../type/type";

export interface ReviewDetailRequest {
  productId: string;
  quantity: number;
}

export interface ReviewRequest {
  customerId: string;
  shippingAddress: string;
  details: ReviewDetailRequest[];
}

export interface InvoiceDetailCreationRequest {
    productId?: string;
    petId?: string;
    quantity: number;
}

export interface InvoiceCreationRequest {
    customerId: string;
    shippingAddress: string;
    paymentMethod: PaymentMethod;
    invoiceDetails: InvoiceDetailCreationRequest[];
}


export interface InvoiceResponse {
  success: boolean;
  message: string;
  data: InvoiceData;
  errorCode: number;
  status: number;
  timestamp: string;
}


export interface InvoiceArrayResponse {
  success: boolean;
  message: string;
  data: InvoiceData[];
  errorCode: number;
  status: number;
  timestamp: string;
}



export interface InvoiceData {
  id: string;
  staffId?: string;
  staffName?: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  realAmount: number;
  status: PaymentStatus;
  invoiceDetails: InvoiceDetail[];
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceDetail {
  id: string;
  productId?: string;
  petId?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;
}

export interface ReviewDetailResponse {
  productId: string;
  productName: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  discountAmount: number;
}

export interface ReviewResponse {
  customerName: string;
  shippingAddress: string;
  totalAmount: number;
  realAmount: number;
  reviewDetails: ReviewDetailResponse[];
}