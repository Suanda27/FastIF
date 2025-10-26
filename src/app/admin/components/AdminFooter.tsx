"use client";

import { motion } from "framer-motion";

export default function AdminFooter() {
  return (
    <motion.footer
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-20
      text-center text-[11px] sm:text-xs font-medium
      bg-gradient-to-r from-[#0A1A55] via-[#1B4DE3] to-[#318FEB]
      text-white border-t border-white/10 shadow-[0_-2px_10px_rgba(0,0,0,0.15)]
      py-3 md:py-4 px-4 md:pl-60
      transition-all duration-500"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <span>© 2025</span>
        <span className="font-semibold text-white">
          Fasilitas Surat Informatika
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="text-gray-200">All rights reserved.</span>
      </div>

      {/* Garis cahaya halus di atas footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm" />
    </motion.footer>
  );
}
