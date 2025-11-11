"use client";

import React, { useState } from "react";
import { Menu, User } from "lucide-react";
import { motion } from "framer-motion";
import SidebarMhs from "../../components/SidebarMhs";
import SuratIzinMagangForm from "./components/SuratIzinMagangForm";

const SidebarMhsAny = SidebarMhs as unknown as React.ComponentType<{
  isOpen: boolean;
  onClose: () => void;
}>;

export default function SuratIzinMagangPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen bg-gray-50"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <SidebarMhsAny
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">

        <main className="flex-1 p-4 md:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1
              className="text-3xl md:text-4xl font-bold text-[#0A1C56]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Pengajuan Surat Izin Magang
            </h1>
          </motion.div>

          <SuratIzinMagangForm />
        </main>
      </div>
    </div>
  );
}
