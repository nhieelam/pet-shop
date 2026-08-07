import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {login as loginService, verifyToken} from "@/services/authService";

import type {IntrospectRequest, LoginRequest} from "@/types/authTypes";
import type {CustomerData, CustomerResponse} from "@/types/customerTypes";
import {getAuthToken, storeAuthToken} from "@/utils/storageUtils.ts";
import {useLocation} from "react-router-dom";
import {getInfo} from "@/services/customerService.ts"
import {logout as logoutService} from "@/services/authService.ts";


interface AuthContextType {
  customer : CustomerData | null;
  setCustomer : (customer : CustomerData ) => void;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const introspect = async () => {
      try {
        const tokenString = getAuthToken();
        console.log("tokenString", tokenString);

        if (!tokenString) {
          setIsAuthenticated(false);
          return;
        }

        const request: IntrospectRequest = {
          token: tokenString,
        };

        const res = await verifyToken(request);

        if (!res.valid) {
          setIsAuthenticated(false);

        }

        setIsAuthenticated(true);

      } catch (error) {
        console.error("Token verify failed:", error);
        setIsAuthenticated(false);
      }
    };

    introspect();
  }, []);


  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const authData = await loginService(credentials);

      setIsAuthenticated(true);

      storeAuthToken(authData.data.token);

      localStorage.setItem("auth_user", JSON.stringify(authData));

      if (location.pathname === "/login" || location.pathname === "user/login") {
        const response: CustomerResponse = await getInfo();

        setCustomer(response.data);
      }
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đăng nhập thất bại");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setCustomer(null);
    setError(null);

    const tokenString = getAuthToken();

    if (tokenString) {
      await logoutService({ token: tokenString });
    } else {
      await logoutService();
    }
  };

  return (
      <AuthContext.Provider
          value={{
            customer,
            setCustomer,
            loading,
            error,
            login,
            logout,
            isAuthenticated,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

