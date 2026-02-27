import { http } from "./http";
import { API_CONFIG } from "@/config/apiConfig";
import { LoginRequest, LoginResponse } from "@/types/authTypes";
import { ApiResponse } from "@/types/user";

export async function login(dto: LoginRequest) {
  const res = await http.post<ApiResponse<LoginResponse>>(
    API_CONFIG.ENDPOINTS.AUTH.LOGIN,
    dto
  );
  return res.data; 
}