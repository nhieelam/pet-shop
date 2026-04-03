import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { getInfo } from "@/services/customerService";
import { getAllPromotions } from "@/services/promotionService";
import {
  addCartItemToCart,
  addPetToCart,
  deleteCartItem,
} from "@/services/cartService";
import type { CartItem, CartData } from "@/types/cartTypes";
import type { CustomerData } from "@/types/customerTypes";
import type { PromotionData } from "@/types/promotionTypes";

function mergeCartIntoCustomer(
  customer: CustomerData,
  cart: CartData
): CustomerData {
  return {
    ...customer,
    cart: cart,
  } as CustomerData;
}

export function getProductId(item: CartItem): string {
  return item.product!.id;
}

export function getPetId(item: CartItem): string {
  return item.pet!.id;
}

export function useCart() {
  const { customer, setCustomer, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selection, setSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [promotions, setPromotions] = useState<PromotionData[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setPromotions([]);
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const list = await getAllPromotions();
        if (!cancelled) setPromotions(Array.isArray(list) ? list : []);
      } catch {
        if (!cancelled) setPromotions([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const items: CartItem[] = (
    customer?.cart.cartItems ?? []
  ).filter((item) => item.quantity > 0);

  const productItems = useMemo(
    () => items.filter((i) => i.product),
    [items]
  );

  const petItems = useMemo(
    () => items.filter((i) => i.pet?.id),
    [items]
  );

  const refreshCart = useCallback(async () => {
    try {
      const customer = await getInfo();
      setCustomer(customer.data);
    } catch (e) {
      setError("Không thể tải giỏ hàng");
    }
  }, [setCustomer]);

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
      if (!customer) return;
      setLoading(true);
      setError("");
      try {
        if (newQuantity <= 0) {
          const line = items.find((i) => i.product?.id === productId);
          if (!line) return;
          const cartRes = await deleteCartItem(customer.id, line.id);
          setCustomer(mergeCartIntoCustomer(customer, cartRes.data));
        } else {
          const cartRes = await addCartItemToCart(customer.id, {
            productId,
            quantity: newQuantity,
          });
          setCustomer(mergeCartIntoCustomer(customer, cartRes.data));
        }
      } catch (e) {
        setError("Cập nhật thất bại");
      } finally {
        setLoading(false);
      }
    },
    [customer, setCustomer, items]
  );

  const updatePetQuantity = useCallback(
    async (petId: string, newQuantity: number) => {
      if (!customer) return;
      setLoading(true);
      setError("");
      try {
        if (newQuantity <= 0) {
          const line = items.find((i) => i.pet?.id === petId);
          if (!line) return;
          const cartRes = await deleteCartItem(customer.id, line.id);
          setCustomer(mergeCartIntoCustomer(customer, cartRes.data));
        } else {
          const cartRes = await addPetToCart(customer.id, {
            petId,
            quantity: newQuantity,
          });
          setCustomer(mergeCartIntoCustomer(customer, cartRes.data));
        }
      } catch (e) {
        setError("Cập nhật thất bại");
      } finally {
        setLoading(false);
      }
    },
    [customer, setCustomer, items]
  );

  const removeItem = useCallback(
    async (cartItemId: string) => {
      if (!customer) return;
      setLoading(true);
      setError("");
      try {
        const cartRes = await deleteCartItem(customer.id, cartItemId);
        setCustomer(mergeCartIntoCustomer(customer, cartRes.data));
      } catch (e) {
        setError("Không thể xóa sản phẩm");
      } finally {
        setLoading(false);
      }
    },
    [customer, setCustomer]
  );

  const checkout = useCallback(() => {
    const selected = items.filter((item) => selection[item.id] ?? true);
    if (selected.length === 0) {
      setError("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
    setError("");
    const payload = selected.map((item) => {
      if (item.pet) {
        return {
          id: item.id,
          petId: item.pet.id,
          name: item.pet.name ?? "Thú cưng",
          price: item.pet.price ?? 0,
          quantity: item.quantity,
          image: item.pet.imageUrl ?? "",
          isSelected: true,
        };
      }
      return {
        id: item.id,
        productId: getProductId(item),
        name: item.product?.name ?? "Sản phẩm",
        price: item.product?.price ?? 0,
        quantity: item.quantity,
        image: item.product?.imageUrl ?? "",
        isSelected: true,
      };
    });
    navigate("/user/review", { state: { checkoutItems: payload } });
  }, [items, selection, navigate]);

  const allSelected = useMemo(
    () => items.length > 0 && items.every((item) => selection[item.id] ?? true),
    [items, selection]
  );

  return {
    items,
    productItems,
    petItems,
    selection,
    allSelected,
    loading,
    error,
    isAuthenticated,
    promotions,
    toggleSelect,
    selectAll,
    updateQuantity,
    updatePetQuantity,
    removeItem,
    checkout,
    refreshCart,
  };
}
