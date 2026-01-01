"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function PreviewModal({
  file,
  onClose,
  closing,
}: {
  file: string;
  onClose: () => void;
  closing?: boolean;
}) {
  // Detect extension
  const ext = (file || "").split(".").pop()?.toLowerCase() || "";

  // URL berbeda untuk tipe file IMAGE
  const url =
    ext === "pdf" || ["doc", "docx"].includes(ext)
      ? `http://localhost:8001/uploads/${encodeURIComponent(file)}`
      : `http://localhost:8001/preview/${encodeURIComponent(file)}`;

  const isImage = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext);
  const isPdf = ext === "pdf";

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
        className="relative bg-white rounded-2xl shadow-2xl w-[95%] max-w-5xl p-4 border border-gray-100"
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
          Preview Surat: <span className="text-blue-600">{file}</span>
        </h2>

        {/* Konten Preview */}
        <div className="w-full h-[70vh] bg-gray-50 border border-gray-200 rounded overflow-hidden flex items-center justify-center">
          {isPdf ? (
            <iframe
              title={file}
              src={url}
              className="w-full h-full"
              style={{ border: "none" }}
            />
          ) : isImage ? (
            <iframe
              title={file}
              src={url}
              className="w-full h-full"
              style={{ border: "none" }}
            />
          ) : (
            <div className="text-center space-y-4">
              <p className="mb-3 text-sm text-gray-600">
                Tidak dapat menampilkan preview untuk tipe file ini.
              </p>
              <a
                href={url}
                download
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Download {file}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
