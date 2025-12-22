"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Mail, RefreshCcw, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

type StatusSurat = "Diproses" | "Diterima" | "Ditangguhkan";

interface Surat {
  nama: string;
  nim: string;
  jurusan: string;
  jenis: string;
  status: StatusSurat;
  created_at: string;
}

const statusColor: Record<StatusSurat, string> = {
  Diproses: "bg-blue-500",
  Diterima: "bg-green-500",
  Ditangguhkan: "bg-red-500",
};

// Card Dashboard (agar tidak dirender ulang setiap render)
const dashboardCards = [
  {
    title: "Pengajuan Surat",
    gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    icon: <Mail size={22} />,
    key: "pengajuan",
  },
  {
    title: "Verifikasi Surat",
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    icon: <RefreshCcw size={22} />,
    key: "verifikasi",
  },
  {
    title: "Surat Selesai",
    gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
    icon: <CheckSquare size={22} />,
    key: "selesai",
  },
];

// Fungsi mapping status (lebih rapi)
const mapStatus = (status: string): StatusSurat => {
  const low = status.toLowerCase();
  if (low === "diproses") return "Diproses";
  if (low === "diterima") return "Diterima";
  return "Ditangguhkan";
};

const sortSurat = (a: any, b: any) => {
  const dateA = new Date(a.created_at).getTime();
  const dateB = new Date(b.created_at).getTime();

  // 1️⃣ Diproses selalu di atas
  if (a.status === "Diproses" && b.status !== "Diproses") return -1;
  if (a.status !== "Diproses" && b.status === "Diproses") return 1;

  // 2️⃣ Urutkan berdasarkan tanggal (lama → baru)
  return dateA - dateB;
};

export default function DashboardPage() {
  const [stats, setStats] = useState({
    pengajuan: 0,
    verifikasi: 0,
    selesai: 0,
  });

  const [allSurat, setAllSurat] = useState<Surat[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting Data
  const dataSurat = useMemo(() => {
  return [...allSurat]
    .sort(sortSurat);
  }, [allSurat]);

  const totalPages = Math.ceil(dataSurat.length / itemsPerPage);

  const paginatedData = useMemo(
    () =>
      dataSurat.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [dataSurat, currentPage]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/cardadmin", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();

        setStats({
          pengajuan: data.pengajuan || 0,
          verifikasi: data.verifikasi || 0,
          selesai: data.selesai || 0,
        });

        const mapped = data.dataSurat.map((item: any) => ({
          ...item,
          jurusan: item.jurusan || "-",
          status: mapStatus(item.status),
          created_at: item.created_at,
        }));

        setAllSurat(mapped);
      } catch (error) {
        console.error("Error mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
        Dashboard
      </h1>

      {/* CARD STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            className={`${card.gradient} text-white rounded-2xl shadow-lg p-6 h-36 flex flex-col justify-between relative cursor-pointer transition-transform hover:scale-[1.03] hover:shadow-xl`}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 150, damping: 10 }}
          >
            <div className="absolute top-4 right-4 opacity-90">{card.icon}</div>
            <h2 className="text-base font-semibold">{card.title}</h2>
            <p className="text-5xl font-bold">
              <CountUp
                start={0}
                end={stats[card.key as keyof typeof stats]}
                duration={2}
              />
            </p>
          </motion.div>
        ))}
      </div>

      {/* TABLE */}
      <motion.div
        className="bg-white rounded-xl shadow-md border border-gray-300 p-6 transition-all duration-500 hover:shadow-lg"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Data Surat Mahasiswa
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Tabel ini menampilkan data pengajuan surat oleh mahasiswa
        </p>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm border-collapse transition-all duration-300">
            <thead className="bg-[#EDEDED] text-gray-900">
              <tr className="border-b border-[#A2A2A2]">
                {["Nama", "NIM", "Jurusan", "Jenis Surat", "Status Surat"].map(
                  (head) => (
                    <th
                      key={head}
                      className="px-4 py-3 text-left font-semibold border-b border-[#A2A2A2]"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <motion.tr
                    key={index}
                    className={`border-b border-[#A2A2A2] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                    } hover:bg-[#E9E9E9] transition-colors duration-300`}
                    whileHover={{ scale: 1.005 }}
                  >
                    <td className="px-4 py-3 text-gray-800">{item.nama}</td>
                    <td className="px-4 py-3 text-gray-800">{item.nim}</td>
                    <td className="px-4 py-3 text-gray-800">{item.jurusan}</td>
                    <td className="px-4 py-3 text-gray-800">{item.jenis}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                          statusColor[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-500 py-6 italic"
                  >
                    Belum ada data surat
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              className="px-3 py-1 rounded-lg bg-blue-900 text-white hover:bg-blue-600 transition disabled:opacity-40"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg transition text-white ${
                  currentPage === i + 1
                    ? "bg-blue-700"
                    : "bg-blue-900 hover:bg-blue-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 rounded-lg bg-blue-900 text-white hover:bg-blue-600 transition disabled:opacity-40"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
