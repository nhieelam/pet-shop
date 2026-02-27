import { useState, useCallback } from "react";
import type { UserRegisterRequest, RegisterFormErrors } from "@/types/user";
import { validateForm } from "../validation";
import { registerUser } from "@/api/users.api";

interface UseRegisterFormReturn {
  formData: UserRegisterRequest;
  errors: RegisterFormErrors;
  isLoading: boolean;
  apiError?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: UserRegisterRequest = {
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export function useRegisterForm(): UseRegisterFormReturn {
  const [formData, setFormData] = useState<UserRegisterRequest>(initialFormData);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

    },
    [errors]
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});

  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) return;

      setIsLoading(true);

      try {
        const result = await registerUser(formData);

        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        resetForm();
      } catch (error) {
        console.error("Registration error:", error);

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