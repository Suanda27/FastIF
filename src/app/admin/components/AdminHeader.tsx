"use client";

import { Search, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminHeader() {
  const [isVisible, setIsVisible] = useState(false);

  // Efek muncul halus saat load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-16 fixed top-0 left-0 right-0 z-30 flex items-center justify-between
          bg-gradient-to-r from-[#0A1A55] via-[#1B4DE3] to-[#318FEB]
          backdrop-blur-md shadow-md border-b border-white/10 px-4 md:px-6 pl-16 md:pl-60"
        >
          {/* === Search Box === */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari Surat..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/95 text-sm text-gray-700
                placeholder-gray-400 shadow-sm focus:shadow-md focus:ring-2 focus:ring-[#1B4DE3]/40
                focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* === Bell Icon === */}
          <div className="flex items-center ml-3 text-white">
            <div className="relative group cursor-pointer">
              <Bell
                size={22}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-yellow-300"
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] rounded-full px-1.5 text-white shadow-sm">
                3
              </span>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
