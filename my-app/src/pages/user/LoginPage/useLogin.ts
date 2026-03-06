import { useNavigate, useLocation } from "react-router-dom";
import {useAuth} from "../../../context/authContext.tsx";
import {useState} from "react";

interface LoginErrors {
  userName?: string;
  password?: string;
  general?: string;
}

interface UseLoginReturn {
  userName: string;
  password: string;
  errors: LoginErrors;
  isLoading: boolean;
  setUserName: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: (field: keyof LoginErrors) => void;
}

export function useLogin(): UseLoginReturn {
  const navigate = useNavigate();
  const location = useLocation();
  const {login} = useAuth();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "Tên đăng nhập không được để trống";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await login({ userName, password });

      setUserName("");
      setPassword("");

      alert("Đăng nhập thành công!");

      // 🔥 Kiểm tra nếu đang ở đường dẫn admin
      if (location.pathname.includes("/admin")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/products");
      }

    } catch (error: unknown) {
      console.error("Login error:", error);

      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({
          general: "Đăng nhập thất bại. Vui lòng thử lại.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field: keyof LoginErrors): void => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

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
