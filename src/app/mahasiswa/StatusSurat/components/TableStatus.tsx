"use client";

import type { Surat } from "../page"; 
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import BadgeStatus from "./BadgeStatus";
import dynamic from "next/dynamic";

function formatTanggalIndonesia(tgl: string) {
  if (!tgl) return "-";
  return new Date(tgl).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


const DetailModal = dynamic(() => import("./DetailModal"), { ssr: false });

interface TableStatusProps {
  suratList: Surat[];
}

export default function TableStatus({ suratList }: TableStatusProps) {
  const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailClick = (surat: Surat) => {
    setSelectedSurat(surat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
   
    setTimeout(() => setSelectedSurat(null), 300);
  };

  return (
    <>
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontFamily: "Roboto, sans-serif" }}>
            <thead>
              <tr style={{ backgroundColor: "#0A1C56" }}>
                <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                  Nomor Surat
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                  Jenis Surat
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {suratList.map((surat, index) => (
                <motion.tr
                  key={surat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium" style={{ color: "#0A1C56" }}>
                      {surat.nomorSurat}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium" style={{ color: "#0A1C56" }}>
                      {surat.jenisSurat}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium"style={{ color: "#0A1C56" }}>{formatTanggalIndonesia(surat.tanggal)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <BadgeStatus status={surat.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDetailClick(surat)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                      style={{ backgroundColor: "#1976D2" }}
                    >
                      <Eye className="w-4 h-4" />
                      Detail
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {suratList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada data surat</p>
          </div>
        )}
      </div>

      <div className="md:hidden space-y-4">
        {suratList.map((surat, index) => (
          <motion.div
            key={surat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-lg p-4"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Nomor Surat</p>
                  <p className="text-sm font-semibold" style={{ color: "#0A1C56" }}>
                    {surat.nomorSurat}
                  </p>
                </div>
                <BadgeStatus status={surat.status} />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Jenis Surat</p>
                <p className="text-sm font-semibold" style={{ color: "#0A1C56" }}>
                  {surat.jenisSurat}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                <p className="text-sm font-medium" style={{ color: "#0A1C56" }}> {formatTanggalIndonesia(surat.tanggal)}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDetailClick(surat)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-colors"
                style={{ backgroundColor: "#1976D2" }}
              >
                <Eye className="w-4 h-4" />
                Lihat Detail
              </motion.button>
            </div>
          </motion.div>
        ))}

        {suratList.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500">Tidak ada data surat</p>
          </div>
        )}
      </div>

      <DetailModal surat={selectedSurat} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
