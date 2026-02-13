import { Link, useLocation } from "react-router-dom";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/admin/dashBoard" },
  { label: "Danh sách sản phẩm", href: "/admin/listProducts" },
  { label: "Nhập kho", href: "/admin/stock" },
  { label: "Quản lí hóa đơn", href: "/admin/manageOrders" },
  { label: "Quản lí danh mục", href: "/admin/manageProductCategory" },
  { label: "Quản lí dịch vụ", href: "/admin/manageServices" },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
      <aside className="fixed top-0 left-0 w-64 h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 text-white flex flex-col z-50">
        <nav className="p-5">
          <h2 className="text-lg font-bold text-white mb-6 px-3">
            📊 Admin Panel
          </h2>

          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname.startsWith(item.href);

              return (
                  <li key={item.href}>
                    <Link
                        to={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                        }`}
                    >
                      {item.label}
                    </Link>
                  </li>
              );
            })}
          </ul>
        </nav>
      </aside>
  );
};

export default AdminSidebar;
