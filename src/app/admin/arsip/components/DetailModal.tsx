"use client";

import { motion } from "framer-motion";
import { X, FileText } from "lucide-react";

export default function DetailModal({
  row,
  closing,
  onClose,
  onPreview,
}: {
  row: any;
  closing?: boolean;
  onClose: () => void;
  onPreview: (file: string) => void;
}) {
  // row.detail berasal dari backend (form_surat_izin) jika tipe izin
  const detail = row.detail || {};

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
  className="
    relative bg-white rounded-2xl shadow-2xl 
    w-[95%] max-w-4xl 
    max-h-[90vh] 
    overflow-y-auto 
    p-8 
    border border-gray-100
  "
>
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Detail Surat Mahasiswa
        </h2>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Field label="Nama" value={row.nama || "-"} />
            <Field label="NIM" value={row.nim || "-"} />
            <Field label="Jurusan" value={row.jurusan || "-"} />
            <Field label="Jenis Surat" value={row.jenis_surat || row.jenis || "-"} />
          </div>

          <div className="space-y-4">
            <Field
              label="Tanggal Pengajuan"
              value={
                row.tanggal_pengajuan
                  ? new Date(row.tanggal_pengajuan).toLocaleString("id-ID")
                  : "-"
              }
            />
            <Field label="Status" value={(row.status || "-").toString()} />

            {/* Jika surat izin, tampilkan info tambahan */}
            {row.jenis_surat === "Surat Izin Kehadiran" && (
              <>
                <div className="mt-2" />
                <Field label="Nama Orang Tua" value={detail.nama_orangtua || "-"} />
                <Field label="No HP Orang Tua" value={detail.nohp_orangtua || "-"} />
                <Field label="Kelas Perkuliahan" value={detail.kelas_perkuliahan || "-"} />
                <Field label="Dosen Wali" value={detail.nama_dosen_wali || "-"} />
                <Field label="Jenis Perizinan" value={detail.jenis_perizinan || "-"} />
                <div className="grid grid-cols-2 gap-4 gap-y-3">
                  <Field
                    label="Mulai Izin"
                    value={
                      detail.tanggal_mulai
                        ? new Date(detail.tanggal_mulai).toLocaleDateString("id-ID")
                        : "-"
                    }
                  />
                  <Field
                    label="Akhir Izin"
                    value={
                      detail.tanggal_selesai
                        ? new Date(detail.tanggal_selesai).toLocaleDateString("id-ID")
                        : "-"
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200" />

        {/* Keterangan */}
        <div>
          <label className="text-xs uppercase tracking-wider text-gray-500">
            Keterangan / Keperluan
          </label>
          <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 min-h-[80px]">
            {row.keperluan || row.keterangan || "Tidak ada keterangan."}
          </div>
        </div>

        {/* File Lampiran */}
        <div className="mt-6">
          <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
            Berkas Terlampir
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            {(row.files || []).length > 0 ? (
              row.files.map((f: string, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 text-gray-700">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-sm truncate max-w-[150px]">{f}</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`http://localhost:8001/uploads/${encodeURIComponent(f)}`}
                      download
                      className="text-xs px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      Download
                    </a>
                    <button
                      onClick={() => onPreview(f)}
                      className="text-xs px-3 py-1 border border-gray-400 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Tidak ada lampiran.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>
      <div className="mt-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
        {value}
      </div>
    </div>
  );
}
