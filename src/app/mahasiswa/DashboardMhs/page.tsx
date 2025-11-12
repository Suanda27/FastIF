'use client';

import Sidebar from '../components/SidebarMhs';
import DashboardHeader from '../components/DashboardHeaderMhs';
import StatCard from '../components/StatCardMhs';
import ActivityTable from '../components/ActivityTableMhs';
import LetterCard from '../components/LetterCardMhs';
import StudentHeader from '../components/StudentHeader';

const mockActivities = [
  { date: '11-10-2025', type: 'Surat Izin', status: 'Selesai' as const },
  { date: '11-10-2025', type: 'Surat Survey', status: 'Selesai' as const },
  { date: '11-10-2025', type: 'Surat Pengantar', status: 'Selesai' as const },
  { date: '11-10-2025', type: 'Surat Izin', status: 'Ditangguhkan' as const },
];

const letterTypes = [
  { title: 'Surat Izin Kehadiran', exampleLink: '#', templateLink: '#' },
  { title: 'Surat Survei', exampleLink: '#', templateLink: '#' },
  { title: 'Surat Izin Pengantar', exampleLink: '#', templateLink: '#' },
  { title: 'Surat Izin Magang', exampleLink: '#', templateLink: '#' },
];

export default function DashboardMhsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen w-full">
        <StudentHeader/>

        <main className="flex-1 p-4 md:p-8">
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-[#0A1C56] mb-2">
              Selamat Datang di FastIF
            </h2>
            <h1 className="text-2xl md:text-4xl font-bold text-[#0A1C56]">
              Fasilitas Surat Informatika
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Surat Diajukan" value={3} variant="submitted" />
            <StatCard title="Surat Diverifikasi" value={2} variant="verified" />
            <StatCard title="Surat Selesai" value={5} variant="completed" />
          </div>

          <div className="mb-8">
            <ActivityTable activities={mockActivities} />
          </div>

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