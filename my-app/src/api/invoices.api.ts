import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type {
  InvoiceResponse,
  InvoiceCreationRequest,
} from "../types/invoiceTypes";

export async function createInvoice(dto: InvoiceCreationRequest) {
  const res = await http.post<{ data: InvoiceResponse }>(
    API_CONFIG.ENDPOINTS.INVOICE.CREATE,
    dto
  );
  return res.data;
}

export async function getAllInvoices() {
  const res = await http.get<{ data: InvoiceResponse[] }>(
    API_CONFIG.ENDPOINTS.INVOICE.GET_ALL
  );
  return res.data;
}

export async function getInvoiceById(id: string) {
  const res = await http.get<{ data: InvoiceResponse }>(
    API_CONFIG.ENDPOINTS.INVOICE.GET_BY_ID(id)
  );
  return res.data;
}

export async function deleteInvoice(id: string) {
  const res = await http.delete(
    API_CONFIG.ENDPOINTS.INVOICE.DELETE(id)
  );
  return res.data;
}
