import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type { UserCreationRequest } from "../types/userTypes";
import type { CustomerResponse } from "../types/customerTypes";

export async function createCustomer(dto: UserCreationRequest) {
  const res = await http.post<{ data: CustomerResponse }>(
    API_CONFIG.ENDPOINTS.CUSTOMER.CREATE,
    dto
  );
  return res.data;
}

export async function getAllCustomers() {
  const res = await http.get<{ data: CustomerResponse[] }>(
    API_CONFIG.ENDPOINTS.CUSTOMER.GET_ALL
  );
  return res.data;
}

export async function getCustomerById(id: string) {
  const res = await http.get<{ data: CustomerResponse }>(
    API_CONFIG.ENDPOINTS.CUSTOMER.GET_BY_ID(id)
  );
  return res.data;
}

export async function getCustomerInfo() {
  const res = await http.get<{ data: CustomerResponse }>(
    API_CONFIG.ENDPOINTS.CUSTOMER.GET_INFO
  );
  return res.data;
}

export async function addCustomerPoints(id: string, points: number) {
  const url = `${API_CONFIG.ENDPOINTS.CUSTOMER.ADD_POINTS(id)}?points=${points}`;
  const res = await http.post<{ data: CustomerResponse }>(url);
  return res.data;
}

export async function deleteCustomer(id: string) {
  const res = await http.delete(
    API_CONFIG.ENDPOINTS.CUSTOMER.DELETE(id)
  );
  return res.data;
}
