"use client";

import { Outlet } from "react-router-dom";
import UserHeader from "../components/UserHeader.tsx";
import UserFooter from "../components/UserFooter.tsx";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen min-h-dvh flex-col">
      <UserHeader />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
}
