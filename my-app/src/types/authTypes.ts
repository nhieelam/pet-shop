export type LoginRequest = {
  username: string;
  password: string;
};

export type UserResponse = {
  id: string; // UUID
  username: string;
  phone?: string;
  address?: string;
  role?: string;
  status?: string;
  createdAt?: string | null;
};

export type LoginResponse = {
  token: string;
  user: UserResponse;
};