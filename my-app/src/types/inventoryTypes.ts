export interface InventoryData {
  id: string;
  productId?: string;
  petId?: string;
  quantity?: number;
  status?: string;
}

export interface InventoryResponse {
  success: boolean;
  message: string;
  data: InventoryData | InventoryData[];
  errorCode?: number;
  status?: number;
  timestamp?: string;
}
