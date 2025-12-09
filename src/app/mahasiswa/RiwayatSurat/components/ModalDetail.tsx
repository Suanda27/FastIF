'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Calendar,
  User,
  Hash,
  CheckCircle,
  Eye,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useState } from 'react';

interface SuratData {
  id: number;
  nomorSurat: string;
  jenisSurat: string;
  tanggal: string;
  status: 'Selesai' | 'Diproses' | 'Ditangguhkan';
  keterangan?: string;
  keperluan?: string;
  file?: string;
}

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  surat: SuratData | null;
}

export default function ModalDetail({ isOpen, onClose, surat }: ModalDetailProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);

  if (!surat) return null;

  const fileUrl = surat.file ? `http://localhost:8001/uploads/${surat.file}` : null;
  const ext = surat.file?.split('.').pop()?.toLowerCase() || '';

  const renderPreview = (isFullscreen = false) => {
    const height = isFullscreen ? 'h-[90vh]' : 'h-80';

    if (!fileUrl) {
      return (
        <div className="p-4 text-center text-gray-600">
          Tidak ada file.
        </div>
      );
    }

    if (ext === 'pdf') {
      return <iframe src={fileUrl} className={`w-full ${height}`} />;
    }

    if (['jpg', 'jpeg', 'png'].includes(ext)) {
      return <img src={fileUrl} className="w-full h-auto" />;
    }

    if (['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(ext)) {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
          className={`w-full ${height}`}
        />
      );
    }

    return (
      <div className="p-4 text-center text-gray-600">
        File tidak dapat ditampilkan.
        <br />
        <a href={fileUrl} download className="text-blue-600 underline">
          Download File
        </a>
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />

            {/* MODAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">

                {/* HEADER */}
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

                {/* CONTENT */}
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="space-y-4 sm:space-y-6">

                    {/* NOMOR SURAT */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                        <Hash className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Nomor Surat</p>
                        <p className="text-base sm:text-lg font-bold text-[#0A1C56] break-all">
                          {surat.nomorSurat}
                        </p>
                      </div>
                    </motion.div>

                    {/* JENIS SURAT */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Jenis Surat</p>
                        <p className="text-base sm:text-lg font-semibold text-[#0A1C56]">
                          {surat.jenisSurat}
                        </p>
                      </div>
                    </motion.div>

                    {/* TANGGAL */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Tanggal Pengajuan</p>
                        <p className="text-base sm:text-lg font-semibold text-[#0A1C56]">
                          {surat.tanggal}
                        </p>
                      </div>
                    </motion.div>

                    {/* KEPERLUAN */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.32 }}
                      className="flex items-start gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Keperluan</p>
                        <p className="text-base sm:text-lg font-semibold text-[#0A1C56]">
                          {surat.keperluan || '—'}
                        </p>
                      </div>
                    </motion.div>

                    {/* FILE PREVIEW */}
                    {surat.file && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <p className="text-sm font-medium text-gray-600 mb-2">Lampiran Surat</p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#1976D2] hover:bg-[#0A1C56] text-white text-sm rounded-lg transition"
                          >
                            <Eye className="w-4 h-4" />
                            {showPreview ? 'Sembunyikan' : 'Lihat File'}
                          </button>

                          {showPreview && (
                            <button
                              onClick={() => setFullscreenPreview(true)}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-black text-white text-sm rounded-lg transition"
                            >
                              <Maximize2 className="w-4 h-4" />
                              Perbesar
                            </button>
                          )}
                        </div>

                        {showPreview && (
                          <div className="mt-4 rounded-lg overflow-hidden border shadow">
                            {renderPreview(false)}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* STATUS */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: surat.file ? 0.45 : 0.4 }}
                      className="flex items-start gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Status</p>

                        <span
                          className={`px-4 py-1.5 rounded-full text-sm text-white ${
                            surat.status === 'Selesai'
                              ? 'bg-green-500'
                              : surat.status === 'Diproses'
                              ? 'bg-blue-500'
                              : 'bg-yellow-500'
                          }`}
                        >
                          {surat.status}
                        </span>
                      </div>
                    </motion.div>

                    {/* KETERANGAN */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: surat.file ? 0.55 : 0.5 }}
                      className="flex items-start gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-[#1976D2] rounded-lg flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Keterangan</p>
                        <p className="text-sm sm:text-base text-gray-700">
                          {surat.keterangan || '—'}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm sm:text-base"
                    >
                      Tutup
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 bg-[#1976D2] hover:bg-[#0A1C56] text-white rounded-lg shadow-lg text-sm sm:text-base"
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

      {/* FULLSCREEN PREVIEW */}
      <AnimatePresence>
        {fullscreenPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullscreenPreview(false)}
              className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[70] flex flex-col p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Preview Lampiran
                </h2>

                <button
                  onClick={() => setFullscreenPreview(false)}
                  className="text-white bg-white/20 hover:bg-white/30 p-2 rounded-full"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-xl flex-1 overflow-hidden">
                {renderPreview(true)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
