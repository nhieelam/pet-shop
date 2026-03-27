export interface PetCreationRequest {
  name: string;
  species: string;
  breed: string;
  birth: string;
  gender: string;
  price: number;
  vaccinated: boolean;
  imageUrl: string;
}

export interface PetUpdateRequest {
  name?: string;
  species?: string;
  breed?: string;
  birth: string;
  gender?: string;
  price?: number;
  vaccinated?: boolean;
  available?: boolean;
  imageUrl?: string;
}

export interface PetResponse{
  success: boolean;
  message: string;
  data: PetData;
  errorCode: number;
  status: number;
  timestamp: string;
}

export interface PetResponseArray {
  success: boolean;
  message: string;
  data: PetData[];
  errorCode: number;
  status: number;
  timestamp: string;
}

export interface PetData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  species: string;
  breed: string;
  birth: string;
  gender: string;
  price: number;
  vaccinated: boolean;
  available: boolean;
  sold: boolean;
  createdAt: string;
  updatedAt: string;
}