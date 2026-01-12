import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import { storeAuthToken, storeUserName } from "../../../controllers/authController";

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
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    // if (!userName) {
    //   newErrors.userName = "userName không được để trống";
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName)) {
    //   newErrors.userName = "userName không hợp lệ";
    // }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const authResponse = await login({ userName, password });

      // Store token and username in localStorage
      storeAuthToken(authResponse.token);
      storeUserName(userName);

      // Clear form
      setUserName("");
      setPassword("");

      // Show success message
      alert("Đăng nhập thành công!");

      // Redirect to products page
      navigate("/user/products");
    } catch (error: any) {
      console.error("Login error:", error);
      setErrors({
        general: error.message || "Đăng nhập thất bại. Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field: keyof LoginErrors) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
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
