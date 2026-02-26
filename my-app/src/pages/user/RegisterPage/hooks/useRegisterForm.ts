import { useState, useCallback } from "react";
import type { RegisterFormData, RegisterFormErrors } from "../types";
import { initialFormData } from "../types";
import { validateForm } from "../validation";

interface UseRegisterFormReturn {
  formData: RegisterFormData;
  errors: RegisterFormErrors;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useRegisterForm(): UseRegisterFormReturn {
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
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Registration attempt with:", formData);
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        resetForm();
      } catch (error) {
        console.error("Registration error:", error);
        alert("Đăng ký thất bại. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, resetForm]
  );

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
