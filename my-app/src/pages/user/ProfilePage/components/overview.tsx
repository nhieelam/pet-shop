import { useCallback, useEffect, useState } from "react";
import type { UserData } from "@/types/userTypes";
import type { CustomerData } from "@/types/customerTypes";
import { useProfile } from "../hooks/useProfile";

function formatDateTime(value: string | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type Props = {
  user: UserData;
  customer: CustomerData;
};

export default function OverviewTab({ user, customer }: Props) {
  const { updateProfile } = useProfile();
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username;
  const totalOrders = customer.invoices?.length ?? 0;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const syncFormFromUser = useCallback(() => {
    setEditFirstName(user.firstName ?? "");
    setEditLastName(user.lastName ?? "");
    setEditEmail(user.email ?? "");
    setEditPhone(user.phone ?? "");
    setEditAddress(user.address ?? "");
  }, [user]);

  useEffect(() => {
    if (isEditOpen) {
      syncFormFromUser();
      setFormError(null);
    }
  }, [isEditOpen, syncFormFromUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      await updateProfile(user.id, {
        firstName: editFirstName.trim() || undefined,
        lastName: editLastName.trim() || undefined,
        email: editEmail.trim() || undefined,
        phone: editPhone.trim() || undefined,
        address: editAddress.trim() || undefined,
      });
      setIsEditOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-bold text-gray-800">Thông tin tài khoản</h3>
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="shrink-0 inline-flex justify-center items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
          >
            Cập nhật thông tin
          </button>
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-gray-500 sm:w-40 shrink-0">Họ và tên</dt>
            <dd className="font-medium text-gray-900">{displayName}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-gray-500 sm:w-40 shrink-0">Tên đăng nhập</dt>
            <dd className="font-medium text-gray-900 font-mono">{user.username}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-gray-500 sm:w-40 shrink-0">Email</dt>
            <dd className="font-medium text-gray-900 break-all">{user.email}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-gray-500 sm:w-40 shrink-0">Số điện thoại</dt>
            <dd className="font-medium text-gray-900">{user.phone || "—"}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-gray-500 sm:w-40 shrink-0">Địa chỉ</dt>
            <dd className="font-medium text-gray-900">{user.address || "—"}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-gray-500 sm:w-40 shrink-0">Trạng thái</dt>
            <dd className="font-medium text-gray-900">{user.status}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-gray-500 sm:w-40 shrink-0">Mã người dùng</dt>
            <dd className="font-mono text-xs text-gray-800 break-all">{user.id}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-gray-500 sm:w-40 shrink-0">Tạo lúc</dt>
            <dd className="text-gray-800">{formatDateTime(user.createdAt)}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-gray-500 sm:w-40 shrink-0">Cập nhật lần cuối</dt>
            <dd className="text-gray-800">{formatDateTime(user.updatedAt)}</dd>
          </div>
        </dl>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Thống kê nhanh</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tổng hóa đơn</span>
              <span className="text-2xl font-bold text-blue-600">{totalOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Điểm tích lũy</span>
              <span className="text-2xl font-bold text-emerald-600">{customer.points ?? 0}</span>
            </div>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Đóng"
            onClick={() => !saving && setIsEditOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-100">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Cập nhật thông tin</h4>
            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{formError}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Họ</label>
                <input
                  type="text"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tên</label>
                <input
                  type="text"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                  disabled={saving}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Số điện thoại"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ</label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Địa chỉ"
                  disabled={saving}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  disabled={saving}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
