"use client";

import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { useState } from "react";
import { Surat } from "../page";

export interface DetailModalProps {
  surat: Surat | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface InfoBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | null | undefined;
  delay?: number;
}

export interface InfoBoxStatusProps {
  surat: Surat;
  delay?: number;
}

export default function DetailModal({ surat, isOpen, onClose }: DetailModalProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);

  if (!surat) return null;

  const fileName = surat.file ?? "";
  const fileUrl = `http://localhost:8001/uploads/${fileName}`;
  const ext = fileName.split(".").pop()?.toLowerCase() || "";

  function formatTanggal(tgl: string) {
  if (!tgl) return "-";
  return new Date(tgl).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


  const renderPreview = (isFullscreen = false) => {
    const height = isFullscreen ? "h-[90vh]" : "h-80";

    if (ext === "pdf") {
      return <iframe src={fileUrl} className={`w-full ${height}`} />;
    }

    if (["jpg", "jpeg", "png"].includes(ext ?? "")) {
      return <img src={fileUrl} className="w-full h-auto" />;
    }

    if (["doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(ext)) {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
          className={`w-full ${height}`}
        ></iframe>
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
      {/* =================== MAIN DETAIL MODAL =================== */}
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
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0A1C56] to-[#1976D2] px-6 py-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-6 h-6" /> Detail Surat
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-white hover:bg-white/20 rounded-full p-1"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="space-y-6">
                    {/* INFO COMPONENTS */}
                    <InfoBox
                      icon={<Hash className="w-5 h-5 text-white" />}
                      label="Nomor Surat"
                      value={surat.nomorSurat}
                      delay={0.1}
                    />

                    <InfoBox
                      icon={<FileText className="w-5 h-5 text-white" />}
                      label="Jenis Surat"
                      value={surat.jenisSurat}
                      delay={0.2}
                    />

                    <InfoBox
                      icon={<Calendar className="w-5 h-5 text-white" />}
                      label="Tanggal Pengajuan"
                      value={formatTanggal(surat.tanggal)}
                      delay={0.3}
                    />

                    <InfoBox
                      icon={<FileText className="w-5 h-5 text-white" />}
                      label="Keperluan"
                      value={surat.keperluan ?? "—"}
                      delay={0.35}
                    />

                    {/* =================== LAMPIRAN + PREVIEW =================== */}
                    {surat.file && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Lampiran Surat
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#1976D2] hover:bg-[#0A1C56] text-white text-sm rounded-lg transition"
                          >
                            <Eye className="w-4 h-4" />
                            {showPreview ? "Sembunyikan" : "Lihat File"}
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

                        {/* PREVIEW */}
                        {showPreview && (
                          <div className="mt-4 rounded-lg overflow-hidden border shadow">
                            {renderPreview(false)}
                          </div>
                        )}
                      </motion.div>
                    )}

                    <InfoBoxStatus surat={surat} delay={0.45} />

                    <InfoBox
                      icon={<User className="w-5 h-5 text-white" />}
                      label="Keterangan"
                      value={surat.keterangan ?? "—"}
                      delay={0.5}
                    />
                  </div>

                  {/* FOOTER */}
                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
                    >
                      Tutup
                    </button>

                    <button className="px-6 py-2.5 bg-[#1976D2] hover:bg-[#0A1C56] text-white rounded-lg shadow-lg">
                      Cetak Surat
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =================== FULLSCREEN PREVIEW MODAL =================== */}
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

/* --------------------------------------------------
   REUSABLE COMPONENTS
-------------------------------------------------- */

function InfoBox({ icon, label, value, delay }: InfoBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
    >
      <div className="p-2 bg-[#1976D2] rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-[#0A1C56] break-all">{value}</p>
      </div>
    </motion.div>
  );
}

function InfoBoxStatus({ surat, delay }: InfoBoxStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
    >
      <div className="p-2 bg-[#1976D2] rounded-lg">
        <CheckCircle className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-600 mb-1">Status</p>
        <span
          className={`px-4 py-1.5 rounded-full text-sm text-white ${
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
  );
}
