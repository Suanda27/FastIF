"use client";

import { FileText } from "lucide-react";
import ModalShell from "./ModalShell";

export default function DetailModal({
  row,
  onClose,
  onPreview,
  closing,
}: {
  row: any; // dynamic
  onClose: () => void;
  onPreview: (file: string) => void;
  closing?: boolean;
}) {
  const detail = row.detail || {};

  return (
    <ModalShell onClose={onClose} closing={closing} wide>
      {/* ===== SCROLL CONTAINER ===== */}
      <div className="max-h-[75vh] overflow-y-auto pr-2">

        <div className="relative bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl 
          border border-white/20 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] 
          p-8 text-gray-800">

          <h3 className="text-2xl font-semibold mb-6 tracking-wide text-gray-900 border-b border-gray-200 pb-3">
            Detail Surat Mahasiswa
          </h3>

          {/* ===================== INFO DASAR ===================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Field label="Nama" value={row.nama} />
              <Field label="NIM" value={row.nim} />
              <Field label="Jurusan" value={row.jurusan} />
              <Field label="Jenis Surat" value={row.jenis_surat} />
            </div>

            <div className="space-y-5">
              <Field
                label="Tanggal Pengajuan"
                value={new Date(row.tanggal_pengajuan).toLocaleString("id-ID")}
              />

              <Field label="Status" value={row.status.toUpperCase()} />
            </div>
          </div>

          {/* ===================== SURAT IZIN ===================== */}
          {row.jenis_surat === "Surat Izin Kehadiran" && (
            <>
              <div className="my-8 border-t border-gray-300" />

              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Informasi Surat Izin
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <Field label="Nama Orang Tua" value={detail.nama_orangtua} />
                  <Field label="No HP Orang Tua" value={detail.nohp_orangtua} />
                  <Field label="Kelas Perkuliahan" value={detail.kelas_perkuliahan} />
                  <Field label="Dosen Wali" value={detail.nama_dosen_wali} />
                </div>

                <div className="space-y-5">
                  <Field label="Jenis Perizinan" value={detail.jenis_perizinan} />

                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="Tanggal Mulai"
                      value={
                        detail.tanggal_mulai
                          ? new Date(detail.tanggal_mulai).toLocaleDateString("id-ID")
                          : "-"
                      }
                    />
                    <Field
                      label="Tanggal Selesai"
                      value={
                        detail.tanggal_selesai
                          ? new Date(detail.tanggal_selesai).toLocaleDateString("id-ID")
                          : "-"
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== KEPERLUAN / KETERANGAN ===================== */}
          <div className="my-8 border-t border-gray-300" />

          <Field
            label="Keperluan / Keterangan"
            value={row.keperluan || "Tidak ada keterangan."}
            large
          />

          {/* ===================== FILE LAMPIRAN ===================== */}
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
              Lampiran Berkas
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {row.files?.length ? (
                row.files.map((file: string, i: number) => (
                  <LampiranItem key={i} file={file} onPreview={() => onPreview(file)} />
                ))
              ) : (
                <p className="text-gray-500">Tidak ada lampiran.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </ModalShell>
  );
}

function Field({ label, value, large }: { label: string; value: any; large?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{label}</p>
      <div
        className={`bg-white/70 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium shadow-sm ${
          large ? "min-h-[90px]" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function LampiranItem({ file, onPreview }: { file: string; onPreview: () => void }) {
  const ext = file.split(".").pop()?.toLowerCase();

  const isWord = ext === "doc" || ext === "docx";
  const canPrint = ["pdf", "jpg", "jpeg", "png"].includes(ext ?? "");

  const fileUrl = `http://localhost:8001/uploads/${file}`;

  const handleCetak = () => {
    // WORD → langsung download
    if (isWord) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // PDF / IMAGE → buka preview untuk print
    if (canPrint) {
      onPreview();
      return;
    }

    alert("File tidak dapat dicetak");
  };

  return (
    <div className="flex justify-between items-center bg-white/70 border border-gray-200 rounded-lg px-3 py-2 hover:shadow-md transition">
      <div className="flex items-center gap-2 text-gray-700">
        <FileText className="w-4 h-4 text-blue-500" />
        <span className="text-sm truncate max-w-[150px]">{file}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCetak}
          className="text-xs px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Cetak
        </button>

        <button
          onClick={() => onPreview()}
          className="text-xs px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Preview
        </button>
      </div>
    </div>
  );
}


