export interface AuthRequest {
  userName: string;
  password: string;
}

export interface AuthResponse {
  authenticated: boolean;
  token: string;
}

export interface LoginError {
  message: string;
  status?: number;
  errorCode?: number;
}


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  status?: number;
  errorCode?: number;
  timestamp?: string;
}
