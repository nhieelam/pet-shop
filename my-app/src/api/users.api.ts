import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type { RegisterFormData } from "../types/user";

export async function registerUser(dto: RegisterFormData) {
  const res = await http.post(
    API_CONFIG.ENDPOINTS.USER.REGISTER,
    dto
  );

  return res.data;
}