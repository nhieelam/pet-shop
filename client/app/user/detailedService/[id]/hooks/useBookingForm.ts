import { useState, useCallback } from "react";
import { BookingFormData, initialBookingFormData, Service } from "../types";

interface UseBookingFormReturn {
  formData: BookingFormData;
  handleChange: (field: keyof BookingFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent, service: Service) => void;
  resetForm: () => void;
}

export function useBookingForm(): UseBookingFormReturn {
  const [formData, setFormData] = useState<BookingFormData>(initialBookingFormData);

  const handleChange = useCallback((field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialBookingFormData);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent, service: Service) => {
      e.preventDefault();
      
      alert(`Đặt lịch thành công!\n
Dịch vụ: ${service.name}
Tên khách hàng: ${formData.customerName}
Số điện thoại: ${formData.customerPhone}
Tên thú cưng: ${formData.petName}
Ngày: ${formData.bookingDate}
Giờ: ${formData.bookingTime}
Ghi chú: ${formData.notes || "Không có"}

Chúng tôi sẽ liên hệ lại để xác nhận!`);
      
      resetForm();
    },
    [formData, resetForm]
  );

  return {
    formData,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
