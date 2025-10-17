'use client';

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

interface SuratData {
  id: string;
  nomorSurat: string;
  jenisSurat: string;
  tanggal: string;
  status: 'Selesai' | 'Diproses' | 'Ditangguhkan';
  keterangan?: string;
}

interface TableRiwayatProps {
  data: SuratData[];
  onDetailClick: (surat: SuratData) => void;
}

const getStatusClasses = (status: SuratData['status']) => {
  switch (status) {
    case 'Diproses':
      return 'bg-blue-500 text-white';
    case 'Ditangguhkan':
      return 'bg-orange-500 text-white';
    case 'Selesai':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default function TableRiwayat({ data, onDetailClick }: TableRiwayatProps) {
  return (
    <>
      <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <thead>
              <tr style={{ backgroundColor: '#0A1C56' }}>
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
                <th className="px-6 py-4 text-white font-semibold text-sm uppercase tracking-wider text-center">
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
                  <td className="px-6 py-4 text-sm font-medium" style={{ color: '#0A1C56' }}>
                    {surat.nomorSurat}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#0A1C56' }}>
                    {surat.jenisSurat}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{surat.tanggal}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${getStatusClasses(
                        surat.status
                      )}`}
                    >
                      {surat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDetailClick(surat)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                      style={{ backgroundColor: '#1976D2' }}
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
          <p className="text-sm text-gray-600">Menampilkan 1-{data.length} dari {data.length} hasil</p>
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
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Nomor Surat</p>
                  <p className="text-sm font-bold" style={{ color: '#0A1C56' }}>
                    {surat.nomorSurat}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${getStatusClasses(
                    surat.status
                  )}`}
                >
                  {surat.status}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Jenis Surat</p>
                <p className="text-sm font-semibold" style={{ color: '#0A1C56' }}>
                  {surat.jenisSurat}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                <p className="text-sm text-gray-700">{surat.tanggal}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDetailClick(surat)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-colors"
                style={{ backgroundColor: '#1976D2' }}
              >
                <Eye className="w-4 h-4" />
                Lihat Detail
              </motion.button>
            </div>
          </motion.div>
        ))}

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-3">
          <p className="text-sm text-gray-600 text-center">Menampilkan 1-{data.length} dari {data.length} hasil</p>
        </div>
      </div>
    </>
  );
}
