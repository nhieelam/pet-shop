import type { PromotionData } from "@/types/promotionTypes";

export const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
};

export const formatDateOnly = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value ?? 0);
}

export const discountLabel = (p: PromotionData): string => {
    const t = (p.discountType).toUpperCase();
    const v = p.discountValue;
    if (t === "PERCENT") return `${v}%`;
    return formatCurrency(v);
  }