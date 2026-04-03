import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar.tsx";

const AdminLayout = () => {
  return (
      <div className="relative min-h-screen min-h-dvh">
        {/* Sidebar cố định */}
        <AdminSideBar />

        {/* Content: flex + min-h-0 để các trang con dùng h-full / overflow có thể cuộn */}
        <div className="ml-64 flex min-h-screen min-h-dvh flex-col bg-slate-100">
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default AdminLayout;
