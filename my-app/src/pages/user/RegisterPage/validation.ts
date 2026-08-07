import type {RegisterFormData, RegisterFormErrors} from "./types";

export const validateForm = (
  formData: RegisterFormData
): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};


  if (!formData.userName) {
    errors.userName = "userName không được để trống";
  } else if (!/^[a-zA-Z0-9_]+$/.test(formData.userName)) {
    errors.userName = "userName không hợp lệ";
  }

  if (!formData.phone) {
    errors.phone = "Số điện thoại không được để trống";
  } else if (!/^0\d{9,10}$/.test(formData.phone)) {
    errors.phone = "Số điện thoại phải bắt đầu bằng 0 và có 10-11 chữ số";
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

  return errors;
};
