import type { PaymentStatus } from "@/type/type";

export const PAYMENT_STATUS_OPTIONS: { value: PaymentStatus; label: string }[] = [
  { value: "PENDING", label: "Đang xử lý" },
  { value: "PAID", label: "Hoàn thành" },
  { value: "SUCCESS", label: "Đã thành công" },
  { value: "CANCELLED", label: "Đã huỷ" },
  { value: "REFUNDED", label: "Đã hoàn" },
  { value: "FAILED", label: "Thất bại" },
];

const OPTION_BY_VALUE = Object.fromEntries(
  PAYMENT_STATUS_OPTIONS.map((o) => [o.value, o])
) as Record<PaymentStatus, { value: PaymentStatus; label: string }>;

export function isTerminalPaymentStatus(status: PaymentStatus): boolean {
  return status === "PAID" || status === "FAILED" || status === "REFUNDED" || status === "CANCELLED";
}

export type PaymentStatusSelectOption = {
  value: PaymentStatus;
  label: string;
  disabled?: boolean;
};

export function getPaymentStatusSelectOptions(current: PaymentStatus): PaymentStatusSelectOption[] {
  if (current === "PENDING") {
    return [
      { ...OPTION_BY_VALUE.PENDING, disabled: true },
      OPTION_BY_VALUE.FAILED,
      OPTION_BY_VALUE.PAID,
    ];
  }
  return PAYMENT_STATUS_OPTIONS;
}

export function statusSelectClass(status: PaymentStatus): string {
  const base =
    "text-xs font-semibold rounded-lg border px-2 py-1.5 pr-7 min-w-[9.5rem] cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed";
  switch (status) {
    case "PAID":
      return `${base} bg-green-50 border-green-200 text-green-800`;
    case "PENDING":
      return `${base} bg-amber-50 border-amber-200 text-amber-900`;
    case "CANCELLED":
    case "FAILED":
      return `${base} bg-red-50 border-red-200 text-red-800`;
    case "REFUNDED":
      return `${base} bg-slate-100 border-slate-200 text-slate-800`;
    default:
      return `${base} bg-slate-50 border-slate-200 text-slate-800`;
  }
}