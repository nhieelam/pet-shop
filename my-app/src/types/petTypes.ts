export interface PetCreationRequest {
  name: string;
  species: string;
  breed: string;
  birth: string;
  gender: string;
  price: number;
  vaccinated: boolean;
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
}

export interface PetResponse {
  id: string;
  name: string;
  species: string;
  breed: string;
  birth: string;
  gender: string;
  price: number;
  vaccinated: boolean;
  available?: boolean;
  sold?: boolean;
  createdAt: string;
  updatedAt: string;
}
