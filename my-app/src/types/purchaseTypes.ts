import type { PromotionData } from "./promotionTypes";


export type PaymentStatus = string;

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



export interface PurchaseDetailResponse {
    success: boolean,
    message: string,
    data: PurchaseDetail,
    errorCode: number,
    status: number,
    timestamp: string
  }

  export interface PurchaseDetail {
    id: string,
    staffId: string,
    staffName: string,
    customerId: string,
    customerName: string,
    totalAmount: number,
    realAmount: number,
    paymentMethod: string,
    shippingAddress: string,
    promotion: PromotionData,
    status: string,
    createdAt: string,
    invoiceDetails: InvoiceDetail[]
  }

  export interface InvoiceDetail {
    id: string,
    productId: string,
    petId: string,
    unitPrice: number,
    quantity: number,
    totalPrice: number,
    discountAmount: number
  }

