"use client";

import { FileText } from "lucide-react";
import ModalShell from "./ModalShell";
import { SuratRow } from "../data";

export default function DetailModal({
  row,
  onClose,
  onPreview,
  closing,
}: {
  row: SuratRow;
  onClose: () => void;
  onPreview: (id: string) => void;
  closing?: boolean;
}) {
  return (
    <ModalShell onClose={onClose} closing={closing} wide>
      <div className="relative bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-8 text-gray-800">
        <h3 className="text-2xl font-semibold mb-6 tracking-wide text-gray-900 border-b border-gray-200 pb-3">
          Detail Surat Mahasiswa
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <Field label="Nama" value={row.nama} />
            <Field label="NIM" value={row.nim} />
            <Field label="Jurusan" value={row.jurusan} />
            <Field label="Jenis Surat" value={row.jenis} />
          </div>

          <div className="space-y-5">
            {row.jenis === "Surat Izin Kehadiran" && (
              <>
                <Field label="Kelas Perkuliahan" value="TI-2B (dummy)" />
                <Field
                  label="Dosen Wali"
                  value="Bapak Andi Saputra, S.Kom., M.Kom (dummy)"
                />
                <Field
                  label="Jenis Perizinan"
                  value="Tidak Hadir Kuliah (dummy)"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Mulai Izin" value="12 Okt 2025" />
                  <Field label="Akhir Izin" value="14 Okt 2025" />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="my-8 border-t border-gray-200"></div>

        <Field
          label="Keperluan / Keterangan"
          value={row.keterangan || "Tidak ada keterangan."}
          large
        />

        <div className="mt-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Berkas Terlampir
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {(row.files || []).map((f, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white/70 border border-gray-200 rounded-lg px-3 py-2 hover:shadow-md transition"
              >
                <div className="flex items-center gap-2 text-gray-700">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm truncate max-w-[150px]">{f}</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Download
                  </button>
                  <button
                    onClick={() => onPreview(row.id)}
                    className="text-xs px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function Field({
  label,
  value,
  large,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
        {label}
      </p>
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
