"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
	label: string;
	href: string;
};

const NAV_ITEMS: NavItem[] = [
	{ label: "Danh sách sản phẩm", href: "/admin/listProducts" },
	{ label: "Nhập kho", href: "/admin/stock" },
	{ label: "Quản lí hóa đơn", href: "/admin/manageOrders" },
	{ label: "Quản lí danh mục", href: "/admin/manageProductCategory" },
	{ label: "Quản lí dịch vụ", href: "/admin/manageServices" },
];

export default function AdminSidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
			<nav className="p-4">
				<h2 className="text-lg font-bold text-gray-800 mb-4 px-3">📊 Admin Panel</h2>
				<ul className="space-y-1">
					{NAV_ITEMS.map((item) => {
						const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									aria-current={isActive ? "page" : undefined}
									className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
										isActive
											? "bg-blue-600 text-white shadow"
											: "text-gray-700 hover:bg-gray-100"
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
}

