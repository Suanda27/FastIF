// components/LogoutModal.tsx
"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// Animasi untuk latar belakang (backdrop) dengan anotasi tipe
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// Animasi utama untuk kontainer modal dengan anotasi tipe
const modalContainerVariants: Variants = {
  hidden: {
    scale: 0.5,
    rotateX: -15,
    opacity: 0,
    y: -50,
    transition: { duration: 0.4, ease: "easeIn" },
  },
  visible: {
    scale: 1,
    rotateX: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15,
    },
  },
  exit: {
    scale: 0.9,
    rotateX: 10,
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// Variasi animasi untuk elemen-elemen di dalam modal dengan anotasi tipe
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Variasi khusus untuk ikon dengan efek pulse dengan anotasi tipe
const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.8,
    },
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          {/* Backdrop dengan efek blur yang lebih kuat */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          
          {/* Modal Content Container */}
          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
            variants={modalContainerVariants}
            onClick={(e) => e.stopPropagation()}
            style={{
              // Background dengan sentuhan warna utama
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(10, 26, 74, 0.2)", // Border dengan warna utama
            }}
          >
            {/* Header dengan Gradien Warna Utama */}
            <motion.div
              variants={itemVariants}
              className="relative flex items-center justify-center p-8 overflow-hidden"
              style={{
                // Gradien dari warna utama ke biru yang lebih terang
                background: "linear-gradient(135deg, #0A1A4A, #1E40AF)",
              }}
            >
              {/* Efek cahaya animasi dengan warna yang selaras */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-screen filter blur-xl animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-screen filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-xl animate-blob animation-delay-4000"></div>
              </div>

              {/* Ikon dengan latar belakang kontras untuk peringatan */}
              <motion.div
                variants={iconVariants}
                animate="pulse"
                className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full backdrop-blur-sm border-2"
                style={{
                  background: "rgba(251, 191, 36, 0.2)", // Warna kuning/amber untuk peringatan
                  borderColor: "rgba(251, 191, 36, 0.4)",
                }}
              >
                <AlertTriangle className="w-10 h-10 text-yellow-300" />
              </motion.div>
            </motion.div>
            
            {/* Body */}
            <motion.div
              variants={itemVariants}
              className="p-8 text-center"
            >
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-2"
                style={{ color: "#0A1A4A" }} // Judul dengan warna utama
              >
                Konfirmasi Keluar
              </motion.h3>
              
              <motion.p
                variants={itemVariants}
                className="text-gray-600 leading-relaxed"
              >
                Apakah Anda yakin ingin keluar? Semua sesi Anda akan diakhiri.
              </motion.p>
              
              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex gap-4 justify-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-8 py-3 font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                  Batal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 20px rgba(10, 26, 74, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="relative px-8 py-3 font-semibold text-white rounded-xl transition-all duration-200"
                  style={{
                    // Tombol konfirmasi dengan gradien warna utama
                    background: "linear-gradient(135deg, #0A1A4A, #1E40AF)",
                  }}
                >
                  Ya, Keluar
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Close Button */}
            <motion.button
              variants={itemVariants}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}