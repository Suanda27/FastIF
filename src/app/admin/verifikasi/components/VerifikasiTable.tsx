"use client";

import { SuratRow } from "../data";

export default function VerifikasiTable({
  data,
  onDetail,
  onAccept,
  onReject,
}: {
  data: SuratRow[];
  onDetail: (row: SuratRow) => void;
  onAccept: (row: SuratRow) => void;
  onReject: (row: SuratRow) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm uppercase">
          <tr>
            <th className="py-3 px-4 text-left">Nama</th>
            <th className="py-3 px-4 text-left">NIM</th>
            <th className="py-3 px-4 text-left">Jenis Surat</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {row.nama}
                </td>
                <td className="py-3 px-4 text-gray-600">{row.nim}</td>
                <td className="py-3 px-4 text-gray-600">{row.jenis}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      row.status === "Diterima"
                        ? "bg-green-100 text-green-700"
                        : row.status === "Diproses"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onDetail(row)}
                      className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => onAccept(row)}
                      className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition"
                    >
                      Terima
                    </button>
                    <button
                      onClick={() => onReject(row)}
                      className="text-sm bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition"
                    >
                      Tolak
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
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
