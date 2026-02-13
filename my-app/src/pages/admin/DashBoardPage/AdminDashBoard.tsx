import type {FC} from "react";

const stats = [
  {
    title: "Tổng đơn hàng",
    value: "1,245",
    growth: "+12%",
  },
  {
    title: "Doanh thu",
    value: "₫85,400,000",
    growth: "+8%",
  },
  {
    title: "Khách hàng mới",
    value: "320",
    growth: "+15%",
  },
  {
    title: "Sản phẩm",
    value: "540",
    growth: "+5%",
  },
];

const recentOrders = [
  { id: "#ORD001", customer: "Nguyễn Văn A", total: "₫1,200,000", status: "Hoàn thành" },
  { id: "#ORD002", customer: "Trần Thị B", total: "₫850,000", status: "Đang xử lý" },
  { id: "#ORD003", customer: "Lê Văn C", total: "₫2,500,000", status: "Đã hủy" },
];

const AdminDashboard: FC = () => {
  return (
      <div className="p-8 bg-slate-100 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Tổng quan Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Chào mừng bạn quay trở lại 👋
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {stats.map((item, index) => (
              <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
              >
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-2xl font-bold mt-2 text-gray-800">
                  {item.value}
                </h2>
                <span className="text-green-500 text-sm font-medium">
              {item.growth} so với tháng trước
            </span>
              </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Đơn hàng gần đây
          </h2>

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
              {recentOrders.map((order, index) => (
                  <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium text-indigo-600">
                      {order.id}
                    </td>
                    <td className="py-4">{order.customer}</td>
                    <td className="py-4">{order.total}</td>
                    <td className="py-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Hoàn thành"
                                ? "bg-green-100 text-green-600"
                                : order.status === "Đang xử lý"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-red-100 text-red-600"
                        }`}
                    >
                      {order.status}
                    </span>
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
