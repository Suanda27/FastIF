'use client';

import { useEffect, useState } from 'react';

import Sidebar from '../components/SidebarMhs';
import StudentHeader from '../components/StudentHeader';
import StatCard from '../components/StatCardMhs';
import ActivityTable from '../components/ActivityTableMhs';
import LetterCard from '../components/LetterCardMhs';

const letterTypes = [
  { title: 'Surat Izin Kehadiran', exampleLink: '#', templateLink: '#' },
  { title: 'Surat Survei', exampleLink: '#', templateLink: '#' },
  { title: 'Surat Izin Pengantar', exampleLink: '#', templateLink: '#' },
  { title: 'Surat Izin Magang', exampleLink: '#', templateLink: '#' },
];

export default function DashboardMhsPage() {

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function loadAll() {
      try {
        // Ambil user login
        const res = await fetch("http://localhost:8001/api/me", {
          credentials: "include",
        });

        const data = await res.json();
        if (!data.success) {
          setLoading(false);
          return;
        }

        const user = data.user;

        // Ambil statistik
        const statRes = await fetch(
          `http://localhost:8001/api/user/dashboard/stats/${user.id_user}`,
          { credentials: 'include' }
        );
        const statData = await statRes.json();
        setStats(statData.data);

        // Ambil aktivitas
        const actRes = await fetch(
          `http://localhost:8001/api/user/dashboard/aktivitas/${user.id_user}`,
          { credentials: 'include' }
        );
        const actData = await actRes.json();

        const mapped = actData.data.map((item: any) => ({
          date: item.tanggal,
          type: item.jenis_surat,
          status: item.status === "diterima" ? "Selesai" : "Ditangguhkan",
        }));

        setActivities(mapped);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);   
      }
    }

    loadAll();
  }, []); 

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Memuat data...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen w-full">
        <StudentHeader />

        <main className="flex-1 p-4 md:p-8">

          {/* HEADER UTAMA */}
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-[#0A1C56] mb-2">
              Selamat Datang di FastIF
            </h2>
            <h1 className="text-2xl md:text-4xl font-bold text-[#0A1C56]">
              Fasilitas Surat Informatika
            </h1>
          </div>

          {/* STATISTIK */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Surat Diajukan" value={stats.diajukan} variant="submitted" />
            <StatCard title="Surat Diverifikasi" value={stats.diverifikasi} variant="verified" />
            <StatCard title="Surat Selesai" value={stats.selesai} variant="completed" />
          </div>

          {/* AKTIVITAS TERAKHIR */}
          <div className="mb-8">
            <ActivityTable activities={activities} />
          </div>

          {/* SURAT PILIHAN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {letterTypes.map((letter, index) => (
              <LetterCard
                key={index}
                title={letter.title}
                exampleLink={letter.exampleLink}
                templateLink={letter.templateLink}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
