"use client";

import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
}
