"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Calendar, User, Hash, CheckCircle } from "lucide-react";
import { Surat } from "../page";

interface DetailModalProps {
  surat: Surat | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailModal({ surat, isOpen, onClose }: DetailModalProps) {
  if (!surat) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-[#0A1C56] to-[#1976D2] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  Detail Surat
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                      <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                        Nomor Surat
                      </p>
                      <p className="text-base sm:text-lg font-bold text-[#0A1C56] break-all">
                        {surat.nomorSurat}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                        Jenis Surat
                      </p>
                      <p className="text-base sm:text-lg font-semibold text-[#0A1C56]">
                        {surat.jenisSurat}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                        Tanggal Pengajuan
                      </p>
                      <p className="text-base sm:text-lg font-semibold text-[#0A1C56]">
                        {surat.tanggal}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                        Status
                      </p>
                      <span
                        className={`inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium text-white ${
                          surat.status === "Selesai"
                            ? "bg-green-500"
                            : surat.status === "Diproses"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {surat.status}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                        Keterangan
                      </p>
                      <p className="text-sm sm:text-base text-gray-700">
                        {surat.keterangan ?? "—"}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors text-sm sm:text-base order-2 sm:order-1"
                  >
                    Tutup
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 bg-[#1976D2] hover:bg-[#0A1C56] text-white font-medium rounded-lg transition-colors shadow-lg text-sm sm:text-base order-1 sm:order-2"
                  >
                    Cetak Surat
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
