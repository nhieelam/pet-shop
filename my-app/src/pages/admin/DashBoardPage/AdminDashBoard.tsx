import { type FC } from "react";

import type { PaymentStatus } from "@/type/type";
import {
  getPaymentStatusSelectOptions,
  isTerminalPaymentStatus,
  statusSelectClass,
} from "@/utils/paymentStatusUtil";
import { useDashBoard } from "./useDashBoard";





const AdminDashboard: FC = () => {

  const { stats, recentOrders, handleStatusChange, updatingId} = useDashBoard();
  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tổng quan Dashboard</h1>
        <p className="text-gray-500 mt-2">Chào mừng bạn quay trở lại 👋</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
          >
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2 text-gray-800">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Đơn hàng gần đây</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="pb-3">Mã đơn</th>
                <th className="pb-3">Khách hàng</th>
                <th className="pb-3">Tổng tiền</th>
                <th className="pb-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 font-medium text-indigo-600">{order.id}</td>

                  <td className="py-4">{order.customerName ?? "Khách lẻ"}</td>

                  <td className="py-4">{order.realAmount.toLocaleString("vi-VN")} ₫</td>

                  <td className="py-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id || isTerminalPaymentStatus(order.status)}
                      onChange={(e) => {
                        const next = e.target.value as PaymentStatus;
                        void handleStatusChange(order.id, next);
                      }}
                      className={statusSelectClass(order.status)}
                      aria-label="Cập nhật trạng thái đơn hàng"
                    >
                      {getPaymentStatusSelectOptions(order.status).map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
