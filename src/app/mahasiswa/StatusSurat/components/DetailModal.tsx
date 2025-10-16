"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Surat } from "../page";
import BadgeStatus from "./BadgeStatus";

interface DetailModalProps {
  surat: Surat | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailModal({ surat, isOpen, onClose }: DetailModalProps) {
  // jika tidak ada surat, jangan render modal
  if (!surat) return null;

  // disable body scroll saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    // no cleanup needed if not open
    return;
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop: lebih ringan + blur */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            onClick={onClose}
          >
            {/* translucent + blur background (clicking this wrapper will close modal) */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              aria-hidden
            />
            {/* optional subtle vignette to reduce center brightness */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.06) 100%)",
              }}
              aria-hidden
            />
          </motion.div>

          {/* Modal content wrapper: prevents click inside modal from propagating to backdrop */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.98, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 18 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <button
                onClick={onClose}
                aria-label="Tutup detail surat"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#0A1C56" }} />
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold mb-6 pr-8" style={{ color: "#0A1C56" }}>
                Detail Surat
              </h2>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 mb-1">Nomor Surat</p>
                  <p className="text-lg font-semibold" style={{ color: "#0A1C56" }}>
                    {surat.nomorSurat}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 mb-1">Jenis Surat</p>
                  <p className="text-lg font-semibold" style={{ color: "#0A1C56" }}>
                    {surat.jenisSurat}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 mb-1">Tanggal</p>
                  <p className="text-lg font-semibold" style={{ color: "#0A1C56" }}>
                    {surat.tanggal}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <div className="mt-2">
                    <BadgeStatus status={surat.status} />
                  </div>
                </div>

                {surat.keterangan && (
                  <div className="pb-4">
                    <p className="text-sm text-gray-500 mb-1">Keterangan</p>
                    <p className="text-base" style={{ color: "#0A1C56" }}>
                      {surat.keterangan}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg text-white font-medium"
                  style={{ backgroundColor: "#1976D2" }}
                >
                  Tutup
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
