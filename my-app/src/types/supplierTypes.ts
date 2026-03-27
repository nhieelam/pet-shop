export interface SupplierCreationRequest {
    name: string;
    email?: string;
    phone: string;
    address?: string;
}

export interface SupplierUpdateRequest {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    status?: string;
}

export interface SupplierResponse {
    success: boolean;  
    message: string;
    data: SupplierData;
    errorCode: number;
    status: number;
    timestamp: string;
  }

export interface SupplierResponseArray {
    success: boolean;
    message: string;
    data: SupplierData[];
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface SupplierData {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    status?: string;
    createdAt: string;
    updatedAt: string;
}