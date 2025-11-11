"use client";

import { motion } from "framer-motion";
import Sidebar from "../components/SidebarMhs";
import TableStatus from "./components/TableStatus";

export type StatusType = "Diproses" | "Ditangguhkan" | "Selesai";

export interface Surat {
  id: string;
  nomorSurat: string;
  jenisSurat: string;
  tanggal: string;
  status: StatusType;
  keterangan?: string;
}

const dummyData: Surat[] = [
  {
    id: "1",
    nomorSurat: "2025/09/1005",
    jenisSurat: "Surat Izin",
    tanggal: "11-10-2025",
    status: "Selesai",
    keterangan: "Surat izin telah disetujui dan dapat diambil di bagian administrasi.",
  },
  {
    id: "2",
    nomorSurat: "2025/09/1004",
    jenisSurat: "Surat Survey",
    tanggal: "11-10-2025",
    status: "Diproses",
    keterangan: "Surat sedang dalam proses verifikasi oleh dosen pembimbing.",
  },
  {
    id: "3",
    nomorSurat: "2025/09/1003",
    jenisSurat: "Surat Pengantar",
    tanggal: "11-10-2025",
    status: "Selesai",
    keterangan: "Surat pengantar telah selesai dan siap digunakan.",
  },
  {
    id: "4",
    nomorSurat: "2025/09/1002",
    jenisSurat: "Surat Izin",
    tanggal: "11-10-2025",
    status: "Ditangguhkan",
    keterangan: "Menunggu kelengkapan dokumen pendukung dari mahasiswa.",
  },
  {
    id: "5",
    nomorSurat: "2025/09/1001",
    jenisSurat: "Surat Keterangan",
    tanggal: "10-10-2025",
    status: "Selesai",
    keterangan: "Surat keterangan aktif kuliah telah selesai diproses.",
  },
  {
    id: "6",
    nomorSurat: "2025/09/1000",
    jenisSurat: "Surat Rekomendasi",
    tanggal: "10-10-2025",
    status: "Diproses",
    keterangan: "Menunggu persetujuan dari Ketua Program Studi.",
  },
];

export default function StatusSuratPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 lg:ml-0">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A1C56] mb-1 lg:mb-2">
                  Status Surat
                </h1>
                <p className="text-sm lg:text-base text-gray-600"></p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TableStatus suratList={dummyData} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
