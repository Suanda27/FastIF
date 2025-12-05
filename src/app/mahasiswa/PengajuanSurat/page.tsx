"use client";

import React from "react";
import Sidebar from "../components/SidebarMhs";
import CardSurat from "../components/CardSurat";
import StudentHeader from "../components/StudentHeader";

const suratTypes = [
  { title: "Izin Kehadiran", iconName: "Mail", link: "/mahasiswa/PengajuanSurat/IzinKehadiran" },
  { title: "Surat Survei", iconName: "Globe", link: "/mahasiswa/PengajuanSurat/SuratSurvei" },
  { title: "Surat Pengantar", iconName: "Send", link: "/mahasiswa/PengajuanSurat/SuratPengantar" },
  { title: "Surat Beasiswa", iconName: "Award", link: "/mahasiswa/PengajuanSurat/SuratBeasiswa" },
  { title: "Surat Izin Magang", iconName: "Briefcase", link: "/mahasiswa/PengajuanSurat/SuratIzinMagang" },
  { title: "Surat Keterangan Lulus", iconName: "GraduationCap", link: "/mahasiswa/PengajuanSurat/SuratKeteranganLulus" },
];

export default function PengajuanSuratPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-4 md:pl-24 md:pt-2"> 
        <StudentHeader />
        <h1 className="text-3xl md:text-4xl font-bold text-[#0A1C56] mb-8">Pilih Jenis Keperluan</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {suratTypes.map((surat) => (
            <CardSurat
              key={surat.title}
              title={surat.title}
              iconName={surat.iconName}
              link={surat.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
