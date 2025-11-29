"use client";

import { Eye } from "lucide-react";
import { SuratRow } from "../data";

export default function ArsipTable({
  data,
  onDetail,
  onPreview,
}: {
  data: SuratRow[];
  onDetail: (row: SuratRow) => void;
  onPreview: (row: SuratRow) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white uppercase">
          <tr>
            <th className="py-3 px-4 text-left">Nama</th>
            <th className="py-3 px-4 text-left">NIM</th>
            <th className="py-3 px-4 text-left">Jurusan</th>
            <th className="py-3 px-4 text-left">Jenis Surat</th>
            <th className="py-3 px-4 text-center">Detail</th>
            <th className="py-3 px-4 text-center">Lihat Surat</th>
            <th className="py-3 px-4 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((r) => (
              <tr
                key={r.id}
                className="border-t hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {r.nama}
                </td>

                <td className="py-3 px-4 text-gray-600">{r.nim}</td>
                <td className="py-3 px-4 text-gray-600">{r.jurusan}</td>
                <td className="py-3 px-4 text-gray-600">{r.jenis}</td>

                {/* Tombol Lihat Detail */}
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onDetail(r)}
                    className="text-xs px-3 py-1 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-blue-50 transition text-blue-700"
                  >
                    Lihat Detail
                  </button>
                </td>

                {/* Tombol Preview Surat */}
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onPreview(r)}
                    className="text-xs px-3 py-1 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-blue-50 transition text-blue-700 flex items-center gap-2 mx-auto"
                  >
                    <Eye className="w-4 h-4" /> Lihat Surat
                  </button>
                </td>

                {/* Status */}
                <td className="py-3 px-4 text-center">
                  {(() => {
                    const status = r.status?.toLowerCase();

                    if (status === "diterima") {
                      return (
                        <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md border border-green-300">
                          Diterima
                        </span>
                      );
                    }

                    if (status === "ditolak") {
                      return (
                        <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md border border-red-300">
                          Ditangguhkan
                        </span>
                      );
                    }

                    return (
                      <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md border border-yellow-300">
                        Diproses
                      </span>
                    );
                  })()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="text-center text-gray-500 py-6 text-sm"
              >
                Tidak ada data yang cocok.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
