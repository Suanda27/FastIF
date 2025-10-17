import React from "react";
import Sidebar from "../components/SidebarMhs";
import CardSurat from "../components/CardSurat";

const suratTypes = [
  {
    title: "Surat Izin Kehadiran",
    iconName: "Mail",
    link: "/pengajuan/izin-kehadiran",
  },
  {
    title: "Surat Survei",
    iconName: "Globe",
    link: "/pengajuan/survei",
  },
  {
    title: "Surat Pengantar",
    iconName: "Send",
    link: "/pengajuan/pengantar",
  },
  {
    title: "Surat Beasiswa",
    iconName: "Award",
    link: "/pengajuan/beasiswa",
  },
  {
    title: "Surat Izin Magang",
    iconName: "Briefcase",
    link: "/pengajuan/izin-magang",
  },
  {
    title: "Surat Keterangan Lulus",
    iconName: "GraduationCap",
    link: "/pengajuan/keterangan-lulus",
  },
];

export default function PengajuanSuratPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar />
      <div className="p-16 md:pl-24">
        <h1 className="text-4xl font-bold text-[#0A1C56] mb-12">Pilih Jenis Surat</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
