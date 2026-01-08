export interface Service {
  id: string;
  name: string;
  price: number;
  image: string;
  subImages?: string[];
  description: string;
  duration: string;
  rating: number;
  features: string[];
  includes: string[];
  process: string[];
}

export interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  petName?: string;
}

export interface BookingFormData {
  bookingDate: string;
  bookingTime: string;
  customerName: string;
  customerPhone: string;
  petName: string;
  notes: string;
}

export const initialBookingFormData: BookingFormData = {
  bookingDate: "",
  bookingTime: "",
  customerName: "",
  customerPhone: "",
  petName: "",
  notes: "",
};
