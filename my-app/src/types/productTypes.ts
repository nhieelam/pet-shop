export interface ProductResponse {
  success: boolean;
  message: string;
  data: ProductData;
  errorCode: number;
  status: number;
  timestamp: string;
}

export interface ProductResponseArray {
  success: boolean;
  message: string;
  data: ProductData[];
  errorCode: number;
  status: number;
  timestamp: string;
}

export interface ProductData {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    categoryName: string;
    brand: string;
    origin: string;
    unit: string;
    quantity: number;
    expiryDate: string;
    imageUrl?: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductCreationRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  categoryId: string;
  brand: string;
  origin: string;
  expiryDate: string;
  imageUrl: string;
}

export interface ProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  categoryId?: string;
  brand?: string;
  origin?: string;
  expiryDate?: string;
  imageUrl?: string;
}
