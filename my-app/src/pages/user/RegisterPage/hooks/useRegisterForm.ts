import { useState, useCallback } from "react";
import { validateForm } from "../validation";
import type { RegisterFormData, RegisterFormErrors } from "../types";
import type { UseRegisterFormReturn } from "../types";

const initialFormData: RegisterFormData = {
  userName: "",
  phone: "",
  password: "",
  confirmPassword: "",
  address : "",
};


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
