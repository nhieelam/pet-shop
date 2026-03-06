import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type {
  SupplierResponse,
  SupplierCreationRequest,
  SupplierUpdateRequest,
} from "../types/supplierTypes";

export async function createSupplier(dto: SupplierCreationRequest) {
  const res = await http.post<{ data: SupplierResponse }>(
    API_CONFIG.ENDPOINTS.SUPPLIER.CREATE,
    dto
  );
  return res.data;
}

export async function getAllSuppliers() {
  const res = await http.get<{ data: SupplierResponse[] }>(
    API_CONFIG.ENDPOINTS.SUPPLIER.GET_ALL
  );
  return res.data;
}

export async function getSupplierById(id: string) {
  const res = await http.get<{ data: SupplierResponse }>(
    API_CONFIG.ENDPOINTS.SUPPLIER.GET_BY_ID(id)
  );
  return res.data;
}

export async function updateSupplier(id: string, dto: SupplierUpdateRequest) {
  const res = await http.put<{ data: SupplierResponse }>(
    API_CONFIG.ENDPOINTS.SUPPLIER.UPDATE(id),
    dto
  );
  return res.data;
}

export async function deleteSupplier(id: string) {
  const res = await http.delete(
    API_CONFIG.ENDPOINTS.SUPPLIER.DELETE(id)
  );
  return res.data;
}
