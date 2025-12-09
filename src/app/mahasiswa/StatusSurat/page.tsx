"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Sidebar from "../components/SidebarMhs";
import TableStatus from "./components/TableStatus";
import StudentHeader from "../components/StudentHeader";

export type StatusType = "Diproses" | "Ditangguhkan" | "Selesai";

export interface Surat {
  id: string;
  nomorSurat: string;
  jenisSurat: string;
  tanggal: string;
  status: StatusType;
  keterangan?: string;
  keperluan?: string;
  file?: string; 
}

function formatTanggalIndonesia(tanggal: string) {
  if (!tanggal) return "-";
  
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


export default function StatusSuratPage() {
  const [suratList, setSuratList] = useState<Surat[]>([]);
  const [loading, setLoading] = useState(true);

  // === Ambil data dari backend === //
  useEffect(() => {
  fetch("http://localhost:8001/api/user/status-surat", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        console.error("SERVER RESPONSE:", text);
        throw new Error("Server returned non-JSON data");
      }
      return res.json();
    })
    .then((data) => {
      const mapped: Surat[] = data.map((item: any) => ({
  id: String(item.id_surat),
  nomorSurat: `FASTIF-${String(item.id_surat).padStart(4, "0")}`,
  jenisSurat: item.jenis_surat,
  tanggal: formatTanggalIndonesia(item.tanggal_pengajuan),
  status:
    item.status === "diterima"
      ? "Selesai"
      : item.status === "diproses"
      ? "Diproses"
      : "Ditangguhkan",

  keterangan: item.keterangan ?? "-",
  keperluan: item.keperluan ?? "-",
  file: item.file_surat || null,
}));

      setSuratList(mapped);
      setLoading(false);
    })
    .catch((err) => {
      console.error("ERROR FETCHING:", err);
      setLoading(false);
    });
}, []);


  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-50 lg:ml-0">
        <StudentHeader />

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
            {loading ? (
              <p className="text-gray-500">Memuat data...</p>
            ) : (
              <TableStatus suratList={suratList} />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
