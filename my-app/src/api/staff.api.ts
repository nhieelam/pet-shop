import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type { StaffResponse, StaffCreationRequest } from "../types/staffTypes";

export async function createStaff(dto: StaffCreationRequest) {
  const res = await http.post<{ data: StaffResponse }>(
    API_CONFIG.ENDPOINTS.STAFF.CREATE,
    dto
  );
  return res.data;
}

export async function getAllStaff() {
  const res = await http.get<{ data: StaffResponse[] }>(
    API_CONFIG.ENDPOINTS.STAFF.GET_ALL
  );
  return res.data;
}

export async function getStaffById(id: string) {
  const res = await http.get<{ data: StaffResponse }>(
    API_CONFIG.ENDPOINTS.STAFF.GET_BY_ID(id)
  );
  return res.data;
}

export async function getStaffInfo() {
  const res = await http.get<{ data: StaffResponse }>(
    API_CONFIG.ENDPOINTS.STAFF.GET_INFO
  );
  return res.data;
}

export async function updateStaffShift(id: string, shift: number) {
  const res = await http.put<{ data: StaffResponse }>(
    API_CONFIG.ENDPOINTS.STAFF.UPDATE_SHIFT(id, shift)
  );
  return res.data;
}

export async function deleteStaff(id: string) {
  const res = await http.delete(
    API_CONFIG.ENDPOINTS.STAFF.DELETE(id)
  );
  return res.data;
}
