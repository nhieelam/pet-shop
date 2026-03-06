import { useNavigate, useLocation } from "react-router-dom";
import {useAuth} from "../../../context/authContext.tsx";
import {useState} from "react";

export interface LoginErrors {
  general?: string;
  userName?: string;
  password?: string;
}

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const {login} = useAuth();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const clearError = useCallback((field: keyof LoginErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const next: LoginErrors = {};
    if (!userName.trim()) next.userName = "Vui lòng nhập tên đăng nhập.";
    if (!password) next.password = "Vui lòng nhập mật khẩu.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [userName, password]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsLoading(true);

      try {
        const res = await login({
          username: userName.trim(),
          password: password,
        });

        navigate("/");
      } catch (err) {

      } finally {
        setIsLoading(false);
      }
    },
    [userName, password]
  );

  return {
    userName,
    password,
    errors,
    isLoading,
    setUserName,
    setPassword,
    handleSubmit,
    clearError,
  };
}