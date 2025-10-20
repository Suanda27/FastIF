"use client";

import React from "react";
import Link from "next/link";
import { Home, FileText, Clock, History, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarMhsProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/mahasiswa/dashboard" },
  { icon: FileText, label: "Pengajuan Surat", href: "/mahasiswa/PengajuanSurat", active: true },
  { icon: Clock, label: "Status Surat", href: "/mahasiswa/StatusSurat" },
  { icon: History, label: "Riwayat Surat", href: "/mahasiswa/RiwayatSurat" },
];

export default function SidebarMhs({ isOpen, onClose }: SidebarMhsProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:static top-0 left-0 h-screen w-64 bg-[#0A1C56] text-white z-50 lg:translate-x-0 flex flex-col"
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#0A1C56] font-bold text-xl">F</span>
            </div>
            <span className="font-bold text-2xl">FastIF</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose()}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-[#1976D2] text-white shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
