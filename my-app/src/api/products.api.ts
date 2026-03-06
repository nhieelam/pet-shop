import { http } from "./http";
import { API_CONFIG } from "../config/apiConfig";
import type {
  ProductResponse,
  ProductCreationRequest,
  ProductUpdateRequest,
} from "../types/productTypes";

export async function createProduct(dto: ProductCreationRequest) {
  const res = await http.post<{ data: ProductResponse }>(
    API_CONFIG.ENDPOINTS.PRODUCT.CREATE,
    dto
  );
  return res.data;
}

export async function getAllProducts() {
  const res = await http.get<{ data: ProductResponse[] }>(
    API_CONFIG.ENDPOINTS.PRODUCT.GET_ALL
  );
  return res.data;
}

export async function getProductById(id: string) {
  const res = await http.get<{ data: ProductResponse }>(
    API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_ID(id)
  );
  return res.data;
}

export async function updateProduct(id: string, dto: ProductUpdateRequest) {
  const res = await http.put<{ data: ProductResponse }>(
    API_CONFIG.ENDPOINTS.PRODUCT.UPDATE(id),
    dto
  );
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await http.delete(
    API_CONFIG.ENDPOINTS.PRODUCT.DELETE(id)
  );
  return res.data;
}

export async function getProductsPaginated(page: number, size: number) {
  const res = await http.get<{ data: ProductResponse[] }>(
    API_CONFIG.ENDPOINTS.PRODUCT.PAGINATE,
    { params: { page, size } }
  );
  return res.data;
}
