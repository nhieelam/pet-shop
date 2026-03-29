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
    quantity: number;
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
  categoryId: string;
  brand: string;
  imageUrl: string;
}

export interface ProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  categoryId?: string;
  brand?: string;
  imageUrl?: string;
}
