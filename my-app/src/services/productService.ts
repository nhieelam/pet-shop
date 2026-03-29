
import type {
  ProductResponse,
  ProductCreationRequest,
  ProductUpdateRequest,
  ProductResponseArray,
} from "../types/productTypes";
import {API_CONFIG} from "../config/apiConfig";

export const getProductById = async (productId: string): Promise<ProductResponse> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT.GET_BY_ID(productId)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Không thể lấy product");
  }
  const data = await response.json();
  return data;
};

export const updateProduct = async (
  productId: string,
  body: ProductUpdateRequest
): Promise<ProductResponse> => {
const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT.UPDATE(productId)}`;
const response = await fetch(url, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Không thể cập nhật product");
  }
  const data = await response.json();
  return data;
};

export const deleteProduct = async (productId: string): Promise<ProductResponse> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT.DELETE(productId)}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Không thể xóa product");
  }
  const data = await response.json();
  return data;
};

export const getAllProducts = async (): Promise<ProductResponseArray> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT.GET_ALL}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Không thể lấy danh sách product");
  }
  const data = await response.json();
  console.log(data);
  return data;
};

export const createProduct = async (
  credentials: ProductCreationRequest
): Promise<ProductResponse> => {
const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT.CREATE}`;
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(credentials),
});
if (!response.ok) {
  throw new Error("Không thể tạo product");
}
const data = await response.json();
return data;
};

export const getAllProductsPaginated = async (
    page: number,
    size: number
): Promise<ProductResponseArray> => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT.PAGINATE}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({page, size}),
  });
  if (!response.ok) {
    throw new Error("Không thể lấy danh sách product");
  }
  const data = await response.json();
  return data;
};

export const createListProduct = async (
  request: { products: ProductCreationRequest[] }
): Promise<ProductResponseArray> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT.CREATE_LIST}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error("Không thể tạo danh sách product");
  }
  const data = await response.json();
  return data;
};
