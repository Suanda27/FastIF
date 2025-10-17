'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, UserCircle } from 'lucide-react';
import SidebarMhs from '../components/SidebarMhs';
import TableRiwayat from './components/TableRiwayat';
import ModalDetail from './components/ModalDetail';

interface SuratData {
  id: string;
  nomorSurat: string;
  jenisSurat: string;
  tanggal: string;
  status: 'Selesai' | 'Diproses' | 'Ditangguhkan';
}

const dummyData: SuratData[] = [
  {
    id: '1',
    nomorSurat: '2025/09/1005',
    jenisSurat: 'Surat Izin',
    tanggal: '11-10-2025',
    status: 'Selesai',
  },
  {
    id: '2',
    nomorSurat: '2025/09/1004',
    jenisSurat: 'Surat Survey',
    tanggal: '11-10-2025',
    status: 'Diproses',
  },
  {
    id: '3',
    nomorSurat: '2025/09/1003',
    jenisSurat: 'Surat Pengantar',
    tanggal: '11-10-2025',
    status: 'Selesai',
  },
  {
    id: '4',
    nomorSurat: '2025/09/1002',
    jenisSurat: 'Surat Izin',
    tanggal: '11-10-2025',
    status: 'Ditangguhkan',
  },
  {
    id: '5',
    nomorSurat: '2025/09/1001',
    jenisSurat: 'Surat Keterangan',
    tanggal: '10-10-2025',
    status: 'Selesai',
  },
  {
    id: '6',
    nomorSurat: '2025/09/1000',
    jenisSurat: 'Surat Rekomendasi',
    tanggal: '09-10-2025',
    status: 'Selesai',
  },
];

const jenisSuratOptions = ['Semua Jenis Surat', 'Surat Izin', 'Surat Survey', 'Surat Pengantar', 'Surat Keterangan', 'Surat Rekomendasi'];
const statusOptions = ['Semua Status', 'Selesai', 'Diproses', 'Ditangguhkan'];

export default function RiwayatSuratPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJenisSurat, setSelectedJenisSurat] = useState('Semua Jenis Surat');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState<SuratData | null>(null);

  const filteredData = useMemo(() => {
    return dummyData.filter((surat) => {
      const matchesSearch =
        surat.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surat.jenisSurat.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesJenis =
        selectedJenisSurat === 'Semua Jenis Surat' || surat.jenisSurat === selectedJenisSurat;

      const matchesStatus =
        selectedStatus === 'Semua Status' || surat.status === selectedStatus;

      const matchesDate =
        !selectedDate || surat.tanggal.includes(selectedDate);

      return matchesSearch && matchesJenis && matchesStatus && matchesDate;
    });
  }, [searchQuery, selectedJenisSurat, selectedStatus, selectedDate]);

  const handleDetailClick = (surat: SuratData) => {
    setSelectedSurat(surat);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <SidebarMhs />

      <main className="flex-1 lg:ml-0">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 lg:mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A1C56] mb-1 lg:mb-2">
                  Riwayat Surat
                </h1>
                <p className="text-sm lg:text-base text-gray-600">Lihat semua riwayat pengajuan surat Anda</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 mb-4 lg:mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <div className="relative sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari Surat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 text-sm lg:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedJenisSurat}
                  onChange={(e) => setSelectedJenisSurat(e.target.value)}
                  className="w-full pl-9 lg:pl-10 pr-8 py-2.5 lg:py-3 text-sm lg:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  {jenisSuratOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-9 lg:pl-10 pr-8 py-2.5 lg:py-3 text-sm lg:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 text-sm lg:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TableRiwayat data={filteredData} onDetailClick={handleDetailClick} />
          </motion.div>
        </div>
      </main>

      <ModalDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        surat={selectedSurat}
      />
    </div>
  );
}
