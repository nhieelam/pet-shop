export interface ProductResponse {
    id: string;
    productName: string;
    description: string;
    price: number;
    amount: number;
    createdAt: Date;
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
