import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../validation";
import type { RegisterFormData, RegisterFormErrors } from "../types";
import { register } from "@/services/authService";
import { storeAuthToken, storeUserName } from "@/utils/storageUtils";
import { UserRole } from "@/types/authTypes";

const initialFormData: RegisterFormData = {
  userName: "",
  phone: "",
  password: "",
  confirmPassword: "",
  address : "",
};


export function useRegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }, [errors]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        const registerData = {
          userName: formData.userName,
          phone: formData.phone,
          password: formData.password,
          address: formData.address || undefined,
          role: UserRole.CUSTOMER,
        };

        const response = await register(registerData);
        if (response.success) {
        storeAuthToken(response.data?.token);
          storeUserName(formData.userName);
          navigate("/user/products", { replace: true });
        } else {
          setErrors({ general: response.message || "Đăng ký thất bại"});
        }
      } catch (error: unknown) {
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
  }, [formData, navigate]);

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
