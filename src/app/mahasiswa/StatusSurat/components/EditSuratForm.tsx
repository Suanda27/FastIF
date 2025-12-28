"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  Calendar,
  User,
  Hash,
  CheckCircle,
  Eye,
  Upload,
  Minimize2
} from "lucide-react";
import { Surat } from "../page";

/* =================== PROPS =================== */
export interface EditSuratFormProps {
  surat: Surat | null;
  isOpen: boolean;
  onClose: () => void;
}

/* =================== MAIN COMPONENT =================== */
export default function EditSuratForm({ surat, isOpen, onClose }: EditSuratFormProps) {
  const [keperluan, setKeperluan] = useState("");
  const [fileBaru, setFileBaru] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);

  if (!surat) return null;

  useEffect(() => {
    setKeperluan(surat.keperluan ?? "");
    setFileBaru(null);
  }, [surat]);

  const fileName = surat.file ?? "";
  const fileUrl = `http://localhost:8001/uploads/${fileName}`;
  const ext = fileName.split(".").pop()?.toLowerCase() || "";

  const formatTanggal = (tgl: string) =>
    tgl
      ? new Date(tgl).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";

  const renderPreview = (isFullscreen = false) => {
    const height = isFullscreen ? "h-[90vh]" : "h-80";

    if (ext === "pdf") return <iframe src={fileUrl} className={`w-full ${height}`} />;
    if (["jpg", "jpeg", "png"].includes(ext)) return <img src={fileUrl} className="w-full h-auto" />;

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

  const handleSubmit = async () => {
    if (!surat) return;

    const formData = new FormData();
    formData.append("keperluan", keperluan);
    formData.append("keterangan", ""); // jika ada field keterangan
    if (fileBaru) formData.append("file_surat", fileBaru);

    try {
      // **PERBAIKAN URL** sesuai route backend
      const res = await fetch(`http://localhost:8001/api/user/status-surat/${surat.id}`, {
        method: "PUT",
        body: formData,
        credentials: "include", // penting kalau pakai session
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal update surat");

      console.log("UPDATE SURAT:", data);
      onClose();
    } catch (err: any) {
      console.error("Error saat update surat:", err.message);
      alert("Gagal update surat: " + err.message);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />

            {/* Modal */}
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
                    <FileText className="w-6 h-6" /> Edit Surat
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
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] space-y-6">
                  <InfoBox icon={<Hash className="w-5 h-5 text-white" />} label="Nomor Surat" value={surat.nomorSurat} />
                  <InfoBox icon={<FileText className="w-5 h-5 text-white" />} label="Jenis Surat" value={surat.jenisSurat} />
                  <InfoBox icon={<Calendar className="w-5 h-5 text-white" />} label="Tanggal Pengajuan" value={formatTanggal(surat.tanggal)} />

                  {/* Keperluan Editable */}
                  <motion.div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <p className="text-xs text-gray-600">Keperluan</p>
                    <textarea
                      value={keperluan}
                      onChange={(e) => setKeperluan(e.target.value)}
                      rows={4}
                      className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tuliskan keperluan surat..."
                    />
                  </motion.div>

                  {/* File Lama */}
                  {surat.file && (
                    <motion.div className="p-4 bg-gray-50 rounded-lg space-y-3">
                      <p className="text-sm font-medium text-gray-600">Lampiran Lama</p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowPreview(!showPreview)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#1976D2] text-white rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                          {showPreview ? "Sembunyikan" : "Lihat File"}
                        </button>

                        {showPreview && (
                          <button
                            onClick={() => setFullscreenPreview(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg"
                          >
                            <Minimize2 className="w-4 h-4" /> Perbesar
                          </button>
                        )}
                      </div>

                      {showPreview && <div className="border rounded-lg overflow-hidden">{renderPreview()}</div>}
                    </motion.div>
                  )}

                  {/* Upload Baru */}
                  <motion.div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-gray-600">Upload Lampiran Baru (Opsional)</p>
                    <label className="flex items-center gap-2 cursor-pointer text-[#1976D2]">
                      <Upload className="w-4 h-4" />
                      Pilih File
                      <input
                        type="file"
                        hidden
                        onChange={(e) => setFileBaru(e.target.files?.[0] || null)}
                      />
                    </label>
                    {fileBaru && <p className="text-sm text-gray-700">{fileBaru.name}</p>}
                  </motion.div>

                  {/* Status */}
                  <InfoBoxStatus status={surat.status} />

                  {/* Footer */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2.5 bg-[#1976D2] hover:bg-[#0A1C56] text-white rounded-lg shadow-lg"
                    >
                      Ajukan Ulang
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =================== REUSABLE =================== */
function InfoBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: any }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="p-2 bg-[#1976D2] rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-[#0A1C56] break-all">{value}</p>
      </div>
    </div>
  );
}

function InfoBoxStatus({ status }: { status: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="p-2 bg-[#1976D2] rounded-lg">
        <CheckCircle className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-600 mb-1">Status</p>
        <span className="px-4 py-1.5 rounded-full bg-yellow-500 text-white text-sm">
          {status}
        </span>
      </div>
    </div>
  );
}
