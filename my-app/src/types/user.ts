export type UserRegisterRequest = {
  username : string;
  email: string;
  phone: string;
  address?: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export type UserResponse = {
  username: string;
  phone: string;
};

export type ApiResponse<T> = {
  ok: boolean;
  code?: string;
  message?: string;
  data: T;
  meta?: any;
};


export interface RegisterFormErrors {
  username ?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}