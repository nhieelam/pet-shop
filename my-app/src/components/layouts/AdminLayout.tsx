"use client";

import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminSideBar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
