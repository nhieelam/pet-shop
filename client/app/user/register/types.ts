export interface RegisterFormData {
  fullName: string;
  userName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface RegisterFormErrors {
  fullName?: string;
  userName?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export const initialFormData: RegisterFormData = {
  fullName: "",
  userName: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};
