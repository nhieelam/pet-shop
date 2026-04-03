import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { createInvoice } from "@/services/invoiceService";
import type {
  InvoiceData,
  InvoiceDetailCreationRequest,
  InvoiceResponse,
} from "@/types/invoiceTypes";
import type { PaymentMethod } from "@/type/type";

export interface CheckoutItem {
  id: string;
  productId?: string;
  petId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isSelected: boolean;
}

/** Cart navigates with `{ checkoutItems: CheckoutItem[] }`; tolerate legacy array-only state. */
function checkoutItemsFromLocationState(state: unknown): CheckoutItem[] {
  if (state == null) return [];
  if (Array.isArray(state)) return state as CheckoutItem[];
  if (typeof state === "object" && "checkoutItems" in state) {
    const raw = (state as { checkoutItems?: unknown }).checkoutItems;
    return Array.isArray(raw) ? (raw as CheckoutItem[]) : [];
  }
  return [];
}

export function useReview() {
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
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>(() =>
    checkoutItemsFromLocationState(location.state)
  );
  const shippingAddress = useDefaultAddress ? defaultAddress : newAddress;

  useEffect(() => {
    setCheckoutItems(checkoutItemsFromLocationState(location.state));
  }, [location.state]);

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

    const invoiceDetails: InvoiceDetailCreationRequest[] = 
    checkoutItems.map((item) => {
      const q = Number(item.quantity);
      if (item.petId) {
        return { petId: item.petId, quantity: q };
      }
      return { productId: item.productId, quantity: q };
    });

    setPlacingOrder(true);
    setError(null);
    try {
      const res = await createInvoice({
        customerId: customer.id,
        shippingAddress: shippingAddress.trim(),
        paymentMethod,
        invoiceDetails,
      });

      const invoice =res;
      if (invoice) {
        setCreatedInvoice(invoice.data);
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
