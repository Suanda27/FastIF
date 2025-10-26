"use client";

import { motion } from "framer-motion";
import { X, Clock } from "lucide-react";
import { SuratRow } from "../data";

export default function PreviewModal({
  row,
  onClose,
  closing,
}: {
  row: SuratRow;
  onClose: () => void;
  closing?: boolean;
}) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-300 ${
        closing
          ? "opacity-0 backdrop-blur-none bg-black/0"
          : "opacity-100 backdrop-blur-[8px] bg-black/50"
      }`}
      style={{ pointerEvents: closing ? "none" : "auto" }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{
          scale: closing ? 0.95 : 1,
          opacity: closing ? 0 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="relative bg-white rounded-2xl shadow-2xl w-[95%] max-w-5xl p-8 border border-gray-100"
      >
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Preview Surat:{" "}
          <span className="text-blue-600">{row.files?.[0] || "-"}</span>
        </h2>

        {/* Konten Preview */}
        <div className="w-full h-[70vh] bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <p className="mb-3 text-sm">Preview file belum tersedia (dummy)</p>
            <Clock className="w-5 h-5 mx-auto" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
