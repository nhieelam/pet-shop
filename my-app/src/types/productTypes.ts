export interface ProductResponse {
  id: string;                // UUID -> string
  name: string;
  description: string;
  price: number;             // BigDecimal -> number

  categoryName: string;

  brand: string;
  origin: string;
  unit: string;

  quantity: number;
  imageUrl: string;

  createdAt: string;
  updatedAt: string | null;
}

export interface ProductCreationRequest {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    unit: string;
    categoryId: string; // UUID bên backend → string bên FE
    brand?: string;
    origin?: string;
    imageUrl?: string;
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
