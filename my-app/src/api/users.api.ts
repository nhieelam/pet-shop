import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type { UserCreationRequest } from "../types/userTypes";

export async function registerUser(dto: UserCreationRequest) {
  const res = await http.post(
    API_CONFIG.ENDPOINTS.AUTH.REGISTER,
    dto
  );

  return res.data;
}

export async function getMe() {
  const res = await http.get(
    API_CONFIG.ENDPOINTS.USER.GET_INFO
  );
  return res.data;
}