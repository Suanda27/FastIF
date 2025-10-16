import React from 'react';
import Sidebar from '../components/SidebarMhs';
import CardSurat from '../components/CardSurat';
import { Mail, Globe, Send, Award, Briefcase, GraduationCap } from 'lucide-react';

const suratTypes = [
  {
    title: 'Surat Izin Kehadiran',
    icon: Mail,
    link: '/pengajuan/izin-kehadiran',
  },
  {
    title: 'Surat Survei',
    icon: Globe,
    link: '/pengajuan/survei',
  },
  {
    title: 'Surat Pengantar',
    icon: Send,
    link: '/pengajuan/pengantar',
  },
  {
    title: 'Surat Beasiswa',
    icon: Award,
    link: '/pengajuan/beasiswa',
  },
  {
    title: 'Surat Izin Magang',
    icon: Briefcase,
    link: '/pengajuan/izin-magang',
  },
  {
    title: 'Surat Keterangan Lulus',
    icon: GraduationCap,
    link: '/pengajuan/keterangan-lulus',
  },
];

export default function PengajuanSuratPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar />
      <div className="p-12 pl-18">
        <h1 className="text-4xl font-bold text-[#0A1C56] mb-12">
          Pilih Jenis Surat
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suratTypes.map((surat) => (
            <CardSurat
              key={surat.title}
              title={surat.title}
              icon={surat.icon}
              link={surat.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
