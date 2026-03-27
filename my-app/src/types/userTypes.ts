export interface UserCreationRequest {
    firstName?: string;   
    lastName?: string;    
    email: string;        
    phone: string;        
    address?: string;     
    password: string;     
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: UserData;
    errorCode: number;
    status: number;
    timestamp: string;
  }

export interface UserResponseArray {
    success: boolean;
    message: string;
    data: UserData[];
    errorCode: number;
    status: number;
    timestamp: string;
}

export interface UserData {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    address?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserUpdateRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}
