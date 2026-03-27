import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { createInvoice } from "@/services/invoiceService";
import type {
  InvoiceData,
  InvoiceDetailCreationRequest,
  InvoiceResponse,
  PaymentMethod,
} from "@/types/invoiceTypes";

export interface CheckoutItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isSelected: boolean;
}

export interface UseReviewReturn {
  placingOrder: boolean;
  error: string | null;
  createdInvoice: InvoiceData | null;
  checkoutItems: CheckoutItem[];
  subtotal: number;
  totalAmount: number;
  shippingAddress: string;
  newAddress: string;
  useDefaultAddress: boolean;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (value: PaymentMethod) => void;
  setUseDefaultAddress: (value: boolean) => void;
  setNewAddress: (value: string) => void;
  placeOrder: () => Promise<void>;
}

function invoiceFromCreateResponse(res: InvoiceResponse): InvoiceData | null {
  const d = res.data;
  if (!d) return null;
  if (Array.isArray(d)) return d[0] ?? null;
  return d as unknown as InvoiceData;
}

function parseCheckoutState(state: unknown): CheckoutItem[] {
  if (!state || typeof state !== "object") return [];
  const items = (state as { checkoutItems?: unknown }).checkoutItems;
  if (!Array.isArray(items)) return [];
  return items.filter((item) => item?.productId && Number(item?.quantity) > 0);
}

export function useReview(): UseReviewReturn {
  const { customer, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdInvoice, setCreatedInvoice] = useState<InvoiceData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [newAddress, setNewAddress] = useState("");

  const defaultAddress = customer?.user?.address ?? "";
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>(() => parseCheckoutState(location.state));
  const shippingAddress = useDefaultAddress ? defaultAddress : newAddress;

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * Number(item.quantity), 0);
  const totalAmount = subtotal;

  const placeOrder = useCallback(async () => {
    if (!customer?.id) return;
    if (!shippingAddress.trim()) {
      setError("Vui lòng nhập địa chỉ giao hàng.");
      return;
    }
    if (checkoutItems.length === 0) {
      setError("Không có sản phẩm để đặt hàng.");
      return;
    }

    const invoiceDetails: InvoiceDetailCreationRequest[] = checkoutItems.map((item) => ({
      productId: item.productId,
      quantity: Number(item.quantity),
    }));

    setPlacingOrder(true);
    setError(null);
    try {
      const res = await createInvoice({
        customerId: customer.id,
        shippingAddress: shippingAddress.trim(),
        paymentMethod,
        invoiceDetails,
      });

      const invoice = invoiceFromCreateResponse(res);
      if (invoice) {
        setCreatedInvoice(invoice);
      }

      setCheckoutItems([]);
      navigate(".", { replace: true, state: {} });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đặt hàng thất bại.");
    } finally {
      setPlacingOrder(false);
    }
  }, [customer?.id, shippingAddress, checkoutItems, paymentMethod, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (checkoutItems.length === 0 && !createdInvoice) {
      setError("Không có sản phẩm được chọn. Vui lòng quay lại giỏ hàng.");
    }
  }, [isAuthenticated, navigate, checkoutItems.length, createdInvoice]);

  return {
    placingOrder,
    error,
    createdInvoice,
    checkoutItems,
    subtotal,
    totalAmount,
    shippingAddress,
    newAddress,
    useDefaultAddress,
    paymentMethod,
    setPaymentMethod,
    setUseDefaultAddress,
    setNewAddress,
    placeOrder,
  };
}
