'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar } from 'lucide-react';
import SidebarMhs from '../components/SidebarMhs';
import TableRiwayat from './components/TableRiwayat';
import ModalDetail from './components/ModalDetail';
import StudentHeader from '../components/StudentHeader';

export interface SuratData {
  id: number;
  nomorSurat: string;
  jenisSurat: string;
  tanggal: string;
  status: 'Selesai' | 'Diproses' | 'Ditangguhkan';
  keterangan?: string;
  file?: string;
}


const jenisSuratOptions = [
  'Semua Jenis Surat',
  'Surat Izin',
  'Surat Survey',
  'Surat Pengantar',
  'Surat Keterangan',
  'Surat Rekomendasi'
];

const statusOptions = ['Semua Status', 'Selesai', 'Diproses', 'Ditangguhkan'];

export default function RiwayatSuratPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJenisSurat, setSelectedJenisSurat] = useState('Semua Jenis Surat');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [selectedDate, setSelectedDate] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState<SuratData | null>(null);

  const [dataSurat, setDataSurat] = useState<SuratData[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH USER + RIWAYAT
  useEffect(() => {
    async function loadAll() {
      try {
        // Ambil data login
        const userRes = await fetch("http://localhost:8001/api/me", {
          credentials: "include",
        });

        const userData = await userRes.json();
        if (!userData.success) return;

        const user = userData.user;

        // Ambil riwayat surat user
        const suratRes = await fetch(
          `http://localhost:8001/api/user/riwayat-surat/${user.id_user}`,
          { credentials: "include" }
        );

        const suratData = await suratRes.json();
        setDataSurat(suratData.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  // FILTERING
  const filteredData = useMemo(() => {
    return dataSurat.filter((surat) => {
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
  }, [searchQuery, selectedJenisSurat, selectedStatus, selectedDate, dataSurat]);

  const handleDetailClick = (surat: SuratData) => {
    setSelectedSurat(surat);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Memuat data...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <SidebarMhs />

      <main className="flex-1 lg:ml-0">
        <StudentHeader />

        <div className="p-4 sm:p-6 lg:pt-6 pt-16">

          {/* HEADER */}
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

          {/* FILTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 mb-4 lg:mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">

              <div className="relative sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari Surat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 text-[#0A1C56] placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedJenisSurat}
                  onChange={(e) => setSelectedJenisSurat(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-300 text-[#0A1C56] rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  {jenisSuratOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-300 text-[#0A1C56] rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 text-[#0A1C56] placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

            </div>
          </motion.div>

          {/* TABLE */}
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
