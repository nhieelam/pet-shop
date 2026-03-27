export interface SpeciesResponse {
    success: boolean;
    message: string;
    data: SpeciesData;
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface SpeciesData {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface SpeciesResponseArray {
    success: boolean;
    message: string;
    data: SpeciesData[];
    errorCode: number;
    status: number;
    timestamp: string;
}