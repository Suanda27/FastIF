"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Clock,
  History,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import LogoutModal from "./LogoutModal";

const menuItems = [
  { href: "/mahasiswa/DashboardMhs", label: "Dashboard", icon: Home },
  {
    href: "/mahasiswa/PengajuanSurat",
    label: "Pengajuan Surat",
    icon: FileText,
  },
  { href: "/mahasiswa/StatusSurat", label: "Status Surat", icon: Clock },
  { href: "/mahasiswa/RiwayatSurat", label: "Riwayat Surat", icon: History },
  { href: "/mahasiswa/ProfileMhs", label: "Profil", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isCurrentPath = (href: string) => pathname === href;

  const handleCloseModal = () => {
    setIsLogoutModalOpen(false);
  };

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
        router.push("/login");
      } else {
        alert("Logout gagal, silakan coba lagi.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  return (
    <div className="lg:block">
      {/* Burger button: sedikit diturunkan agar tidak menutupi logo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-4 z-[70] bg-[#0A1A4A] text-white p-2 rounded-lg shadow"
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop: di bawah sidebar */}
      <div
        className={`fixed inset-0 lg:hidden bg-black/50 transition-opacity duration-200 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 30 }}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Sidebar: di atas backdrop, dengan outline kanan hitam */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0A1A4A] z-[40] transform transition-transform duration-300 ease-in-out
          border-r-2 border-black
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:transform-none lg:shadow-none`}
      >
        <div className="p-6 flex justify-center border-zinc-700 mb-4">
          <Link href="/mahasiswa/DashboardMhs">
            <Image
              src="/logo-fastif-white.png"
              alt="FastIF Logo"
              width={150}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* beri padding-top ekstra di mobile supaya teks tidak tertutup burger */}
        <nav className="flex-1 px-2 py-4 pt-16 lg:py-12 lg:pt-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isCurrentPath(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#1E40AF] text-white"
                        : "text-white/80 hover:bg-[#1E40AF]/50 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 pb-6">
          <button
            onClick={() => {
              setIsOpen(false);
              setIsLogoutModalOpen(true);
            }}
            className="flex items-center gap-3 px-2 py-3 rounded-lg text-white/80 hover:bg-[#1E40AF]/50 hover:text-white transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
