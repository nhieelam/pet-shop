import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { getInfo } from "@/services/customerService";
import {
  addCartItemToCart,
  deleteCartItem,
} from "@/services/cartService";
import type { CartItemResponse, CartResponse } from "@/types/cartTypes";
import type { CustomerResponse } from "@/types/customerTypes";

function mergeCartIntoUser(
  user: CustomerResponse,
  cartRes: CartResponse
): CustomerResponse {
  return {
    ...user,
    data: {
      ...user.data,
      cart: cartRes.data,
    },
  };
}

export function getProductId(item: CartItemResponse): string {
  return item.product.id;
}

export function useCart() {
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selection, setSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const items: CartItemResponse[] = (
    user?.data?.cart?.cartItems ?? []
  ).filter((item) => item.quantity > 0);

  const refreshCart = useCallback(async () => {
    try {
      const customer = await getInfo();
      setUser(customer);
    } catch (e) {
      setError("Không thể tải giỏ hàng");
    }
  }, [setUser]);

  const toggleSelect = useCallback((id: string) => {
    setSelection((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const selectAll = useCallback(
    (selectAllFlag: boolean) => {
      setSelection((prev) => {
        const next = { ...prev };
        items.forEach((item) => {
          next[item.id] = selectAllFlag;
        });
        return next;
      });
    },
    [items]
  );

  const updateQuantity = useCallback(
    async (productId: string, newQuantity: number) => {
      if (!user) return;
      setLoading(true);
      setError("");
      try {
        if (newQuantity <= 0) {
          const line = items.find((i) => i.product.id === productId);
          if (!line) return;
          const cartRes = await deleteCartItem(line.id);
          setUser(mergeCartIntoUser(user, cartRes));
        } else {
          const cartRes = await addCartItemToCart({
            productId,
            quantity: newQuantity,
          });
          setUser(mergeCartIntoUser(user, cartRes));
        }
      } catch (e) {
        setError("Cập nhật thất bại");
      } finally {
        setLoading(false);
      }
    },
    [user, setUser, items]
  );

  const removeItem = useCallback(
    async (cartItemId: string) => {
      if (!user) return;
      setLoading(true);
      setError("");
      try {
        const cartRes = await deleteCartItem(cartItemId);
        setUser(mergeCartIntoUser(user, cartRes));
      } catch (e) {
        setError("Không thể xóa sản phẩm");
      } finally {
        setLoading(false);
      }
    },
    [user, setUser]
  );

  const checkout = useCallback(() => {
    const selected = items.filter((item) => selection[item.id] ?? true);
    if (selected.length === 0) {
      setError("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
    setError("");
    const payload = selected.map((item) => ({
      id: item.id,
      productId: getProductId(item),
      name: item.product?.name ?? "Sản phẩm",
      price: item.product?.price ?? 0,
      quantity: item.quantity,
      image: item.product?.imageUrl ?? "",
      isSelected: true,
    }));
    sessionStorage.setItem("checkoutItems", JSON.stringify(payload));
    navigate("/user/review");
  }, [items, selection, navigate]);

  const allSelected = useMemo(
    () => items.length > 0 && items.every((item) => selection[item.id] ?? true),
    [items, selection]
  );

  return {
    items,
    selection,
    allSelected,
    loading,
    error,
    isAuthenticated,
    toggleSelect,
    selectAll,
    updateQuantity,
    removeItem,
    checkout,
    refreshCart,
  };
}
