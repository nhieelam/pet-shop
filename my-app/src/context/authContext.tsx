import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {login as loginService, verifyToken} from "../services/authService";

import type {AuthRequest, IntrospectRequest} from "../types/authTypes";
import type { CustomerResponse } from "../types/customerTypes";
import type {StaffResponse} from "../types/staffTypes.ts";
import {getAuthToken, storeAuthToken} from "../utils/storageUtils.ts";

/* =========================
   CONTEXT TYPE
========================= */
interface AuthContextType {
    user: CustomerResponse | StaffResponse | null;
    setUser: (user: CustomerResponse | StaffResponse) => void;
    loading: boolean;
    error: string | null;
    login: (credentials: AuthRequest) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider for context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<CustomerResponse | StaffResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load user từ localStorage khi reload trang
    useEffect(() => {
        const introspect = async () => {
            const tokenString = getAuthToken();

            if (!tokenString) {
                setIsAuthenticated(false);
                return;
            }

            const request: IntrospectRequest = {
                token: tokenString,
            };

            const res = await verifyToken(request);

            setIsAuthenticated(res.valid);
        };

        introspect();
    }, []);


    /* ---------- LOGIN ---------- */
    const login = async (credentials: AuthRequest): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const authData = await loginService(credentials);
            setIsAuthenticated(true);

            storeAuthToken(authData.token);

            localStorage.setItem("auth_user", JSON.stringify(authData));
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
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/* =========================
   HOOK
========================= */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};
