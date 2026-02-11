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

export interface IntrospectRequest {
    token: string;
}

export interface IntrospectResponse {
    valid: boolean;
}