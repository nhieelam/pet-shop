
export enum UserRole {
  CUSTOMER = "USER",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}
export interface AuthRequest {
  userName: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  data: {
    authenticated: boolean;
    token: string;
  };
  errorCode: number;
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
}
export interface LoginError {
  message: string;
  status?: number;
  errorCode?: number;
}

export interface IntrospectRequest {
    token: string;
}

export interface IntrospectResponse {
    valid: boolean;
}

export interface LogoutRequest {
    token: string;
}

export interface RefreshRequest {
    token: string;
}

export interface RegisterRequest {
  userName: string;
  phone: string;
  password: string;
  address?: string;
  role: UserRole;
}