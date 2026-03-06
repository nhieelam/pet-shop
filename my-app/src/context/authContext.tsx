import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {login as loginService, verifyToken} from "../services/authService";

import type {AuthRequest, IntrospectRequest} from "../types/authTypes";
import type {CustomerResponse} from "../types/customerTypes";
import {getAuthToken, storeAuthToken} from "../utils/storageUtils.ts";
import {useLocation} from "react-router-dom";
import {getInfo} from "../services/customerService.ts"

/* =========================
   CONTEXT TYPE
========================= */
interface AuthContextType {
  user: CustomerResponse | null;
  setUser: (user: CustomerResponse | null) => void;
  loading: boolean;
  error: string | null;
  login: (credentials: AuthRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

// Create provider for context
export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

// Load user từ localStorage khi reload trang
  useEffect(() => {
    const introspect = async () => {
      try {
        const tokenString = getAuthToken();

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
          return;
        }

        setIsAuthenticated(true);

        if (location.pathname === "/login") {
          const customer: CustomerResponse = await getInfo();

          setUser(customer);
        }

      } catch (error) {
        console.error("Token verify failed:", error);
        setIsAuthenticated(false);
      }
    };

    introspect();
  }, []);


  /* ---------- LOGIN ---------- */
  const login = async (credentials: AuthRequest)=> {
    setLoading(true);
    setError(null);

    try {
      const authData = await loginService(credentials);
      setIsAuthenticated(true);

      storeAuthToken(authData.token);

      localStorage.setItem("auth_user", JSON.stringify(authData));

      if (location.pathname === "/login") {
        const customer: CustomerResponse = await getInfo();

        setUser(customer);
      }
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

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("auth_user");
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            setUser,
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

