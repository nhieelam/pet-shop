import type { UserRegisterRequest, RegisterFormErrors } from "@/types/user";

export const validateForm = (
  formData: UserRegisterRequest 
): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};

  if (!formData.username.trim()) {
    errors.username = "Tên đăng nhập không được để trống";
  } else if (formData.username.length < 3) {
    errors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
  } 


if (!formData.phone) {
  errors.phone = "Số điện thoại không được để trống";
} else if (!/^(0\d{9}|\+84\d{9})$/.test(formData.phone)) {
  errors.phone = "SĐT không hợp lệ";
}

  if (!formData.password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (formData.password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu không được để trống";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Mật khẩu không khớp";
  }

  if (!formData.acceptTerms) {
    errors.acceptTerms = "Bạn phải chấp nhận điều khoản";
  }

  return errors;
};
