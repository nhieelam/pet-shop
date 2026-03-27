import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { createInvoice, createInvoiceReview } from "@/services/invoiceService";
import type {
  InvoiceDetailCreationRequest,
  InvoiceReviewData,
  PaymentMethod,
  ReviewResponse,
} from "@/types/invoiceTypes";

/** UI options; API uses PaymentMethod — map COD → Cash */
export type CheckoutPaymentOption = "COD" | "QR_Scanning";

function toApiPaymentMethod(option: CheckoutPaymentOption): PaymentMethod {
  return option === "COD" ? "Cash" : "QR_Scanning";
}

const ONLINE_STAFF_ID =
  (import.meta.env.VITE_ONLINE_STAFF_ID as string | undefined) ?? "";

interface CheckoutItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isSelected: boolean;
}

export interface UseReviewReturn {
  loading: boolean;
  placingOrder: boolean;
  error: string | null;
  review: ReviewResponse | null;
  shippingAddress: string;
  newAddress: string;
  useDefaultAddress: boolean;
  paymentMethod: CheckoutPaymentOption;
  setPaymentMethod: (value: CheckoutPaymentOption) => void;
  setUseDefaultAddress: (value: boolean) => void;
  setNewAddress: (value: string) => void;
  refreshReview: () => Promise<void>;
  placeOrder: () => Promise<void>;
}

function readCheckoutItems(): CheckoutItem[] {
  try {
    const raw = sessionStorage.getItem("checkoutItems");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CheckoutItem =>
        typeof item === "object" &&
        item !== null &&
        "productId" in item &&
        Number((item as CheckoutItem).quantity) > 0
    );
  } catch {
    return [];
  }
}

export function useReview(): UseReviewReturn {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<InvoiceReviewData | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<CheckoutPaymentOption>("COD");
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [newAddress, setNewAddress] = useState("");

  const defaultAddress = user?.data?.user?.address ?? "";
  const checkoutItems = useMemo(() => readCheckoutItems(), []);
  const shippingAddress = useDefaultAddress ? defaultAddress : newAddress;

  const buildInvoiceDetails = useCallback(
    (): InvoiceDetailCreationRequest[] =>
      checkoutItems.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity),
      })),
    [checkoutItems]
  );

  const customerId = user?.data?.id;

  const refreshReview = useCallback(async () => {
    if (!customerId) return;
    if (checkoutItems.length === 0) {
      setError("Không có sản phẩm được chọn để thanh toán.");
      return;
    }
    if (!shippingAddress.trim()) {
      setError("Vui lòng nhập địa chỉ giao hàng.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await createInvoiceReview({
        customerId,
        shippingAddress: shippingAddress.trim(),
        invoiceDetails: buildInvoiceDetails(),
      });
      setReview(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể tải thông tin đơn hàng.");
    } finally {
      setLoading(false);
    }
  }, [customerId, checkoutItems, shippingAddress, buildInvoiceDetails]);

  const placeOrder = useCallback(async () => {
    if (!customerId) return;
    if (!shippingAddress.trim()) {
      setError("Vui lòng nhập địa chỉ giao hàng.");
      return;
    }
    if (checkoutItems.length === 0) {
      setError("Không có sản phẩm để đặt hàng.");
      return;
    }

    const invoiceDetails: InvoiceDetailCreationRequest[] =
      checkoutItems.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity),
      }));

    setPlacingOrder(true);
    setError(null);
    try {
      const invoice = await createInvoice({
        staffId: ONLINE_STAFF_ID,
        customerId,
        shippingAddress: shippingAddress.trim(),
        paymentMethod: toApiPaymentMethod(paymentMethod),
        invoiceDetails,
      });

      sessionStorage.removeItem("checkoutItems");
      navigate(`/user/invoices/${invoice.data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đặt hàng thất bại.");
    } finally {
      setPlacingOrder(false);
    }
  }, [
    customerId,
    shippingAddress,
    checkoutItems,
    paymentMethod,
    navigate,
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (checkoutItems.length === 0) {
      setError("Không có sản phẩm được chọn. Vui lòng quay lại giỏ hàng.");
      return;
    }
    if (!useDefaultAddress && !newAddress.trim()) {
      return;
    }
    if (useDefaultAddress && !defaultAddress.trim()) {
      return;
    }
    void refreshReview();
  }, [
    isAuthenticated,
    navigate,
    checkoutItems.length,
    useDefaultAddress,
    newAddress,
    defaultAddress,
    refreshReview,
  ]);

  return {
    loading,
    placingOrder,
    error,
    review,
    shippingAddress,
    newAddress,
    useDefaultAddress,
    paymentMethod,
    setPaymentMethod,
    setUseDefaultAddress,
    setNewAddress,
    refreshReview,
    placeOrder,
  };
}
