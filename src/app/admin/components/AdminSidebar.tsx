"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

// === ICON COMPONENTS ===
const DashboardIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    fill={color}
  >
    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
  </svg>
);

const FormulirIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    fill={color}
  >
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z" />
  </svg>
);

const VerifikasiIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    fill={color}
  >
    <path d="m691-150 139-138-42-42-97 95-39-39-42 43 81 81ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z" />
  </svg>
);

const ArsipIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    fill={color}
  >
    <path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z" />
  </svg>
);

export default function AdminSidebar({
  onLogoutClick,
}: {
  onLogoutClick: () => void;
}) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "Dashboard", href: "/admin/dashboard", icon: DashboardIcon },
    { name: "Formulir Surat", href: "/admin/formulir", icon: FormulirIcon },
    {
      name: "Verifikasi Surat",
      href: "/admin/verifikasi",
      icon: VerifikasiIcon,
    },
    { name: "Arsip Surat", href: "/admin/arsip", icon: ArsipIcon },
  ];

  useEffect(() => {
    const index = menu.findIndex((item) => item.href === pathname);
    setActiveIndex(index >= 0 ? index : 0);
    const el = document.querySelector("li > a") as HTMLElement;
    if (el) setItemHeight(el.offsetHeight + 12);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* === TOGGLE BUTTON (Mobile) === */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
        className="md:hidden fixed top-5 left-5 z-50 flex flex-col justify-between w-7 h-6 focus:outline-none transition-all duration-300"
      >
        <span
          className={`h-1 w-full rounded-full bg-[#0A1A55] transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2.5 bg-[#318FEB]" : ""
          }`}
        />
        <span
          className={`h-1 w-full rounded-full bg-[#0A1A55] transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-1 w-full rounded-full bg-[#0A1A55] transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2.5 bg-[#318FEB]" : ""
          }`}
        />
      </button>

      {/* === SIDEBAR === */}
      <aside
        className={`fixed left-0 top-0 flex flex-col bg-white shadow-lg min-h-screen w-60 z-40 overflow-hidden transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* === LOGO === */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-gradient-to-r from-[#0A1A55] via-[#1B4DE3] to-[#318FEB] shadow-sm">
          <img
            src="/logo_login.svg"
            alt="FastIF Logo"
            width={100}
            height={40}
            className="drop-shadow-md"
          />
        </div>

        {/* === MENU === */}
        <nav className="flex-1 mt-4 relative">
          <ul className="space-y-2 px-2 relative">
            <span
              className="absolute left-0 w-1 bg-[#318FEB] rounded-r-xl transition-all duration-300"
              style={{
                top: activeIndex * itemHeight + 8,
                height: itemHeight ? itemHeight - 6 : 0,
              }}
            />
            {menu.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl ${
                      active ? "bg-[#E8F1FA] text-[#318FEB]" : "text-[#061A55]"
                    } hover:bg-[#F0F7FF] hover:text-[#318FEB] transition-all duration-300 ease-in-out`}
                  >
                    <Icon color={active ? "#318FEB" : "#061A55"} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* === LOGOUT BUTTON === */}
        <div className="mt-auto border-t border-gray-200">
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#061A55] hover:text-[#318FEB] hover:bg-[#F0F7FF] transition-all duration-300 ease-in-out"
          >
            <LogOut
              size={22}
              className="text-[#061A55] group-hover:text-[#318FEB]"
            />
            <span className="font-medium">Keluar</span>
          </button>

          <div className="py-3 text-center text-xs text-gray-500 border-t border-gray-200">
            © 2025 FastIF Panel
          </div>
        </div>
      </aside>

      {/* === OVERLAY (Mobile) === */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
        />
      )}
    </>
  );
}
