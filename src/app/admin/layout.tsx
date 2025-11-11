"use client";

import { useState } from "react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import AdminFooter from "./components/AdminFooter";
import LogoutModal from "./components/LogoutModal";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      const res = await fetch("http://localhost:8001/api/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/"; // redirect aman
      } else {
        alert("Logout gagal, silakan coba lagi.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* === Sidebar === */}
      <AdminSidebar onLogoutClick={() => setIsLogoutModalOpen(true)} />

      {/* === Konten utama === */}
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-grow pt-20 pb-16 px-6 md:pl-64">{children}</main>
        <AdminFooter />
      </div>

      {/* === Modal Logout (di luar sidebar agar tidak terpotong) === */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
