"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

import Sidebar from "../components/SidebarMhs";
import StudentHeader from "../components/StudentHeader";
import StatCard from "../components/StatCardMhs";
import ActivityTable from "../components/ActivityTableMhs";
import LetterCard from "../components/LetterCardMhs";

export default function DashboardMhsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
  diajukan: 0,
  selesai: 0,
  ditolak: 0,
  });
  const [user, setUser] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);

  // Helper fetch function
  const apiFetch = async (url: string) => {
    try {
      const res = await fetch(url, { credentials: "include" });
      return await res.json();
    } catch (err) {
      console.error("API Fetch Error:", err);
      return { success: false };
    }
  };

  const formatTanggalIndonesia = (dateString: string) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
  };

  type StatusSurat = "Diproses" | "Selesai" | "Ditangguhkan";

  const mapStatus = (status: string): StatusSurat => {
  const low = status.toLowerCase();
  if (low === "diproses") return "Diproses";
  if (low === "diterima") return "Selesai";
  return "Ditangguhkan";
  };

  const sortSurat = (a: any, b: any) => {
  const dateA = new Date(a.created_at).getTime();
  const dateB = new Date(b.created_at).getTime();

  // Diproses selalu di atas
  if (a.status === "Diproses" && b.status !== "Diproses") return -1;
  if (a.status !== "Diproses" && b.status === "Diproses") return 1;

  // Lama → baru
  return dateA - dateB;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    async function loadAll() {
      try {
        // ===== Ambil user login =====
        const meData = await apiFetch("http://localhost:8001/api/me");
        if (!meData?.success) {
          setLoading(false);
          return;
        }

        setUser(meData.user);
        const user = meData.user;

        // ===== Statistik =====
        const statData = await apiFetch(
          `http://localhost:8001/api/dashboard-mhs/stats/${user.id_user}`
        );
        setStats(statData?.data || { diajukan: 0, selesai: 0, ditolak: 0 });

        // ===== Aktivitas =====
        const actData = await apiFetch(
          `http://localhost:8001/api/dashboard-mhs/aktivitas/${user.id_user}`
        );

        setActivities(actData?.data || []);

        // ===== Template Surat =====
        const templateData = await apiFetch(
          "http://localhost:8001/api/formulir"
        );
        setTemplates(templateData?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  const sortedActivities = useMemo(() => {
  return [...activities]
    .map((item: any) => ({
      created_at: item.created_at,
      type: item.jenis,
      status: mapStatus(item.status),
      date: formatTanggalIndonesia(item.created_at),
    }))
    .sort(sortSurat);
  }, [activities]);

  const totalPages = Math.ceil(sortedActivities.length / itemsPerPage);

  const paginatedActivities = useMemo(() => {
  return sortedActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  }, [sortedActivities, currentPage]);


  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen w-full">
        <StudentHeader />

        <main className="flex-1 p-4 md:p-8">
          {/* ===== HEADER UTAMA (ANIMATED) ===== */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8 text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl md:text-2xl font-bold text-[#0A1C56] mb-2"
            >
              Selamat Datang{user?.nama ? ` ${user.nama}` : ""} di FastIF
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-4xl font-bold text-[#0A1C56]"
            >
              Fasilitas Surat Informatika
            </motion.h1>
          </motion.div>

          {/* ===== STATISTIK ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Surat Diajukan"
              value={stats.diajukan}
              variant="submitted"
            />
            <StatCard
              title="Surat Ditolak"
              value={stats.ditolak}
              variant="verified"
            />
            <StatCard
              title="Surat Selesai"
              value={stats.selesai}
              variant="completed"
            />
          </div>

          {/* ===== AKTIVITAS ===== */}
          <div className="mb-8">
            <ActivityTable activities={paginatedActivities} key={currentPage}/>
          </div>

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
        className={`px-3 py-1 rounded-lg text-white transition ${
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
      onClick={() =>
        setCurrentPage((p) => Math.min(p + 1, totalPages))
      }
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)}


          {/* ===== TEMPLATE SURAT ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {templates.map((letter: any) => (
              <LetterCard
                key={letter.id_template}
                title={letter.nama_template}
                exampleLink={
                  letter.file_contoh
                    ? `http://localhost:8001/uploads/${letter.file_contoh}`
                    : null
                }
                templateLink={
                  letter.file_template
                    ? `http://localhost:8001/uploads/${letter.file_template}`
                    : null
                }
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
