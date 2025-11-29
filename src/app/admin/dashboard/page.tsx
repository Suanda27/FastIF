"use client";

import React, { useEffect, useState } from "react";
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
}

const statusColor: Record<StatusSurat, string> = {
  Diproses: "bg-blue-500",
  Diterima: "bg-green-500",
  Ditangguhkan: "bg-red-500",
};

export default function DashboardPage() {
  const [stats, setStats] = useState({
    pengajuan: 0,
    verifikasi: 0,
    selesai: 0,
  });

  const [dataSurat, setDataSurat] = useState<Surat[]>([]);

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

        setDataSurat(
  data.dataSurat.map((item: any) => {
    const low = item.status.toLowerCase();

    let statusDisplay = "Ditangguhkan";
    if (low === "diproses") statusDisplay = "Diproses";
    if (low === "diterima") statusDisplay = "Diterima";
    if (low === "ditolak") statusDisplay = "Ditolak";

    return {
      ...item,
      jurusan: item.jurusan || "-",
      status: statusDisplay,
    };
  })
);
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Pengajuan Surat",
            gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
            icon: <Mail size={22} />,
            value: stats.pengajuan,
          },
          {
            title: "Verifikasi Surat",
            gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
            icon: <RefreshCcw size={22} />,
            value: stats.verifikasi,
          },
          {
            title: "Surat Selesai",
            gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
            icon: <CheckSquare size={22} />,
            value: stats.selesai,
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            className={`${card.gradient} text-white rounded-2xl shadow-lg p-6 h-36 flex flex-col justify-between relative cursor-pointer transition-transform hover:scale-[1.03] hover:shadow-xl`}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 150, damping: 10 }}
          >
            <div className="absolute top-4 right-4 opacity-90">{card.icon}</div>
            <h2 className="text-base font-semibold">{card.title}</h2>
            <p className="text-5xl font-bold">
              <CountUp start={0} end={card.value} duration={2} />
            </p>
          </motion.div>
        ))}
      </div>

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
              {dataSurat.length > 0 ? (
                dataSurat.map((item, index) => (
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
      </motion.div>
    </motion.div>
  );
}
