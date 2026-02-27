import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type { UserRegisterRequest } from "@/types/user";

export async function registerUser(dto: UserRegisterRequest) {
  const res = await http.post(
    API_CONFIG.ENDPOINTS.USER.REGISTER,
    dto
  );

  return res.data;
}

export async function getMe() {
  const res = await http.get(
    API_CONFIG.ENDPOINTS.USER.INFO
  );
  return res.data;
}