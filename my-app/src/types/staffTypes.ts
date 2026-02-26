import type {UserCreationRequest, UserResponse} from "./user.ts";

export interface StaffCreationRequest {
    shift: number;
    userCreationRequest: UserCreationRequest;
}

export interface StaffResponse {
    id: string;
    user: UserResponse;
    shift: number;
}