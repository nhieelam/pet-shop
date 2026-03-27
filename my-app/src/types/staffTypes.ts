import type { UserCreationRequest, UserData } from "./userTypes.ts";

export interface StaffCreationRequest {
    shift: number;
    userCreationRequest: UserCreationRequest;
}

export interface StaffResponse {
    success: boolean;
    message: string;
    data: StaffData;
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface StaffResponseArray {
    success: boolean;
    message: string;
    data: StaffData[];
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface StaffData {
    id: string;
    user: UserData;
    shift: number;
}
