import type { PaymentStatus } from "@/type/type";
export interface PurchaseDetailCreationRequest {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseCreationRequest {
  staffId: string;
  supplierId: string;
  purchaseDetails: PurchaseDetailCreationRequest[];
}

export interface PurchaseLineItem {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface PurchaseResponse {
  id: string;
  supplier?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  totalAmount: number;
  status: PaymentStatus;
  purchaseDetails?: PurchaseLineItem[];
  createdAt: string;
}

export interface PurchaseDetailResponse {
  success: boolean;
  message: string;
  data: PurchaseResponse;
  errorCode: number;
  status: number;
  timestamp: string;
}
