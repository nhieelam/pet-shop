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

/** Line item on a purchase (maps to PurchaseDetailResponse in the API). */
export interface PurchaseLineItem {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

/** Purchase entity returned by GET /purchases and nested in ApiResponse.data. */
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
  status: string;
  purchaseDetails?: PurchaseLineItem[];
  createdAt: string;
}

/** Wrapper for single-purchase endpoints (create / get by id / delete). */
export interface PurchaseDetailResponse {
  success: boolean;
  message: string;
  data: PurchaseResponse;
  errorCode: number;
  status: number;
  timestamp: string;
}
