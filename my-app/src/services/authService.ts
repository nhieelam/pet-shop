import {API_CONFIG} from "../config/apiConfig";
import type {
  AuthResponse,
  IntrospectRequest,
  IntrospectResponse,
  LoginRequest,
  LogoutRequest,
  RefreshRequest,
  RegisterRequest,
} from "../types/authTypes";
import {removeAuthToken, removeUserName} from "../utils/storageUtils";

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const text = await response.text();
  console.log("RAW RESPONSE:", text);

  if (!response.ok) {
    throw new Error(text);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Response is not valid JSON");
  }
};

export const verifyToken = async (request: IntrospectRequest): Promise<IntrospectResponse> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.INTROSPECT}`;
  const response = await fetch(  url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  const data = await response.json();
  return data as IntrospectResponse;
};

export const refresh = async (request: RefreshRequest): Promise<AuthResponse> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`;
  const response = await fetch(  url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  const data = await response.json();
  return data as AuthResponse;
};

export const register = async (credentials: RegisterRequest): Promise<AuthResponse> => {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`;
    const response = await fetch(
        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }
    );
    const data = await response.json();
    return data ;
  } catch (error: unknown) {
    throw new Error("Không thể đăng ký");
  }
};

export const logout = async (request?: LogoutRequest): Promise<void> => {
  if (request?.token) {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`;
      const response = await fetch(url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      if (!response.ok) {
        throw new Error("Không thể đăng xuất");
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      throw new Error("Không thể đăng xuất");
    }
  }
  removeAuthToken();
  removeUserName();
};