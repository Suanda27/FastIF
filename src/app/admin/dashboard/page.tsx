"use client";

import React from "react";
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

const dataSurat: Surat[] = [
  {
    nama: "Muhammad Faiz Difa Suanda",
    nim: "3312411018",
    jurusan: "Teknik Informatika",
    jenis: "Surat Beasiswa",
    status: "Diproses",
  },
  {
    nama: "Muhammad Faiz Difa Suanda",
    nim: "3312411018",
    jurusan: "Teknik Informatika",
    jenis: "Surat Beasiswa",
    status: "Diterima",
  },
  {
    nama: "Muhammad Faiz Difa Suanda",
    nim: "3312411018",
    jurusan: "Teknik Informatika",
    jenis: "Surat Beasiswa",
    status: "Ditangguhkan",
  },
  {
    nama: "Muhammad Faiz Difa Suanda",
    nim: "3312411018",
    jurusan: "Teknik Informatika",
    jenis: "Surat Beasiswa",
    status: "Diterima",
  },
  {
    nama: "Muhammad Faiz Difa Suanda",
    nim: "3312411018",
    jurusan: "Teknik Informatika",
    jenis: "Surat Beasiswa",
    status: "Diproses",
  },
  {
    nama: "Muhammad Faiz Difa Suanda",
    nim: "3312411018",
    jurusan: "Teknik Informatika",
    jenis: "Surat Beasiswa",
    status: "Ditangguhkan",
  },
];

const statusColor: Record<StatusSurat, string> = {
  Diproses: "bg-blue-500",
  Diterima: "bg-green-500",
  Ditangguhkan: "bg-red-500",
};

export default function DashboardPage() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
        Dashboard
      </h1>

      {/* Kartu Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Pengajuan Surat",
            gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
            icon: <Mail size={22} />,
            value: 25,
          },
          {
            title: "Verifikasi Surat",
            gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
            icon: <RefreshCcw size={22} />,
            value: 12,
          },
          {
            title: "Surat Selesai",
            gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
            icon: <CheckSquare size={22} />,
            value: 8,
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

      {/* Tabel Data Surat */}
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
              {dataSurat.map((item, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
