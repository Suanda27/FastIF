'use client';

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

interface SuratData {
  id: string;
  nomorSurat: string;
  jenisSurat: string;
  tanggal: string;
  status: 'Selesai' | 'Diproses' | 'Ditangguhkan';
}

interface TableRiwayatProps {
  data: SuratData[];
  onDetailClick: (surat: SuratData) => void;
}

export default function TableRiwayat({ data, onDetailClick }: TableRiwayatProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-500';
      case 'Diproses':
        return 'bg-blue-500';
      case 'Ditangguhkan':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A1C56]">
                  Nomor Surat
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A1C56]">
                  Jenis Surat
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A1C56]">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A1C56]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A1C56]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((surat, index) => (
                <motion.tr
                  key={surat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {surat.nomorSurat}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#0A1C56]">
                    {surat.jenisSurat}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {surat.tanggal}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium text-white ${getStatusColor(
                        surat.status
                      )}`}
                    >
                      {surat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDetailClick(surat)}
                      className="inline-flex items-center gap-2 text-[#1976D2] hover:text-[#0A1C56] font-medium text-sm transition-colors"
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

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Menampilkan 1-{data.length} dari {data.length} hasil
          </p>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {data.map((surat, index) => (
          <motion.div
            key={surat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Nomor Surat</p>
                  <p className="text-sm font-bold text-gray-900">{surat.nomorSurat}</p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                    surat.status
                  )}`}
                >
                  {surat.status}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Jenis Surat</p>
                    <p className="text-sm font-semibold text-[#0A1C56]">{surat.jenisSurat}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                    <p className="text-sm text-gray-700">{surat.tanggal}</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDetailClick(surat)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1976D2] hover:bg-[#0A1C56] text-white font-medium text-sm rounded-lg transition-colors shadow-md"
              >
                <Eye className="w-4 h-4" />
                Lihat Detail
              </motion.button>
            </div>
          </motion.div>
        ))}

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-3">
          <p className="text-sm text-gray-600 text-center">
            Menampilkan 1-{data.length} dari {data.length} hasil
          </p>
        </div>
      </div>
    </>
  );
}
