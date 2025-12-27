"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, GraduationCap, Briefcase } from "lucide-react";

/* =========================
   DATA LAYANAN SURAT
========================= */
const layananSurat = [
  {
    title: "Surat Aktif Kuliah",
    desc: "Digunakan untuk keperluan administrasi dan beasiswa.",
    detail:
      "Surat Aktif Kuliah digunakan sebagai bukti bahwa mahasiswa masih terdaftar aktif pada semester berjalan.",
    img: "/card-1.jpg",
    badge: "Akademik",
    icon: GraduationCap,
  },
  {
    title: "Surat Penelitian",
    desc: "Izin resmi penelitian mahasiswa tingkat akhir.",
    detail:
      "Surat ini digunakan sebagai izin resmi bagi mahasiswa untuk melakukan penelitian di instansi terkait.",
    img: "/card-2.jpg",
    badge: "Akademik",
    icon: FileText,
  },
  {
    title: "Surat Magang",
    desc: "Persyaratan magang dan kerja praktik.",
    detail:
      "Surat pengantar magang digunakan untuk mahasiswa yang akan melaksanakan kerja praktik atau magang.",
    img: "/card-3.jpg",
    badge: "Layanan",
    icon: Briefcase,
  },
  {
    title: "Surat Cuti",
    desc: "Pengajuan cuti akademik mahasiswa.",
    detail:
      "Surat cuti akademik digunakan ketika mahasiswa ingin menghentikan studi sementara.",
    img: "/card-4.jpg",
    badge: "Administrasi",
    icon: FileText,
  },
  {
    title: "Surat Rekomendasi",
    desc: "Surat rekomendasi dosen atau fakultas.",
    detail:
      "Surat rekomendasi diperlukan untuk beasiswa, pertukaran pelajar, atau keperluan profesional.",
    img: "/card-5.jpg",
    badge: "Administrasi",
    icon: GraduationCap,
  },
  {
    title: "Surat Keterangan Lulus",
    desc: "Digunakan setelah mahasiswa dinyatakan lulus.",
    detail:
      "Surat keterangan lulus digunakan sebelum ijazah resmi diterbitkan.",
    img: "/card-6.jpg",
    badge: "Akademik",
    icon: FileText,
  },
];

/* =========================
   HEADER
========================= */
function Header() {
  return (
    <header className="bg-[#0A1A4A] py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Link href="/">
          <Image
            src="/logo-fastif-white.png"
            alt="FastIF Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  );
}

/* =========================
   FOOTER
========================= */
function Footer() {
  return (
    <footer className="bg-[#0A1A4A] py-6 text-center">
      <p className="text-white text-sm">© 2025 Fasilitas Surat Informatika</p>
    </footer>
  );
}

/* =========================
   MODAL DETAIL SURAT
========================= */
function ModalDetail({ data, onClose }: any) {
  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl"
          >
            <Image
              src={data.img}
              alt={data.title}
              width={600}
              height={300}
              className="h-56 w-full object-cover"
            />

            <div className="p-6 space-y-4">
              <span className="inline-block bg-[#00aeff]/10 text-[#00aeff] text-xs font-semibold px-3 py-1 rounded-full">
                {data.badge}
              </span>

              <h3 className="text-2xl font-bold text-[#0A1C56]">
                {data.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">{data.detail}</p>

              <button
                onClick={onClose}
                className="bg-[#0A1C56] text-white px-6 py-2 rounded-lg hover:bg-[#00aeff] transition"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================
   HOME PAGE
========================= */
export default function Home() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* =========================
          HERO SECTION (ORIGINAL)
      ========================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#0A1C56]">
              FASILITAS SURAT INFORMATIKA
            </h1>

            <p className="text-lg text-gray-700">
              Sistem digital pengelolaan surat mahasiswa yang cepat, transparan,
              dan terintegrasi.
            </p>

            <Link
              href="/login"
              className="inline-block bg-[#0A1C56] hover:bg-[#00aeff] text-white px-8 py-3 rounded-lg transition"
            >
              Masuk
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/banner-homepage.png"
              alt="Banner"
              width={600}
              height={450}
              className="rounded-xl"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* =========================
          CARD LAYANAN
      ========================= */}
      <section className="py-24 px-6 md:px-12">
        <h2 className="text-4xl font-bold text-center text-[#0A1C56] mb-14">
          Layanan & Informasi
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {layananSurat.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                onClick={() => setSelected(item)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative h-60">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <div className="p-6">
                  <span className="inline-block mb-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#00aeff]/10 text-[#00aeff]">
                    {item.badge}
                  </span>

                  <div className="flex items-center gap-3 mb-2">
                    <Icon size={22} className="text-[#0A1C56]" />
                    <h3 className="text-lg font-semibold text-[#0A1C56]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />

      <ModalDetail data={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
