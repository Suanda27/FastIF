'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FileText, CheckCircle, BarChart3, Archive, GraduationCap, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const layananSurat = [
  {
    title: "Izin Kehadiran",
    desc: "Digunakan untuk mengajukan izin tidak mengikuti perkuliahan karena alasan tertentu.",
    detail:
      "Surat izin kehadiran digunakan untuk mengajukan izin tidak mengikuti perkuliahan karena alasan tertentu dalam jangka waktu tertentu.",
    img: "/izin kehadiran.png",
    badge: "Akademik",
    icon: FileText,
  },
  {
    title: "Surat Survei",
    desc: "Surat pengantar resmi untuk keperluan pengambilan data atau survei.",
    detail:
      "Surat pengantar resmi untuk keperluan pengambilan data atau survei ke instansi terkait.",
    img: "/Survey.png",
    badge: "Akademik",
    icon: FileText,
  },
  {
    title: "Surat Pengantar",
    desc: "Surat pengantar resmi mahasiswa kepada instansi atau pihak tertentu.",
    detail:
      "Digunakan sebagai surat pengantar resmi mahasiswa kepada instansi atau pihak tertentu.",
    img: "/Pengantar.png",
    badge: "Layanan",
    icon: FileText,
  },
  {
    title: "Surat Beasiswa",
    desc: "Surat keterangan resmi untuk pengajuan beasiswa.",
    detail:
      "Surat keterangan resmi yang digunakan sebagai syarat administrasi pengajuan beasiswa.",
    img: "/beasiswa.png",
    badge: "Administrasi",
    icon: GraduationCap,
  },
  {
    title: "Surat Izin Magang",
    desc: "Surat izin resmi untuk mengikuti kegiatan magang.",
    detail:
      "Surat izin resmi untuk mengikuti kegiatan magang dalam periode waktu yang telah ditentukan.",
    img: "/magang.svg",
    badge: "Administrasi",
    icon: Briefcase,
  },
  {
    title: "Surat Keterangan Lulus",
    desc: "Surat resmi bahwa mahasiswa telah dinyatakan lulus.",
    detail:
      "Surat resmi yang menyatakan bahwa mahasiswa telah dinyatakan lulus dari program studi.",
    img: "/lulus.png",
    badge: "Akademik",
    icon: GraduationCap,
  },
];

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

export default function Home() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* ===== HERO SECTION ===== */}
        <section className="flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1C56] leading-tight">
                  FASILITAS SURAT INFORMATIKA
                </h1>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Kelola pengajuan dan status surat mahasiswa dengan cepat, mudah, dan terintegrasi.
                </p>

                <Link
                  href="/login"
                  className="inline-block bg-[#0A1C56] text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-[#1E3A8A] transition-colors shadow-md"
                >
                  Masuk
                </Link>
              </div>

              <div className="relative">
                <Image
                  src="/banner-homepage.png"
                  alt="FastIF Banner"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== LAYANAN & INFORMASI ===== */}
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

        {/* ===== TENTANG FASTIF ===== */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A1C56] mb-4">
                Tentang FASTIF
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                FASTIF adalah platform digital yang dirancang khusus untuk mempermudah proses pengajuan surat bagi mahasiswa Informatika. Dengan sistem yang transparan dan real-time, kami memberikan pengalaman administratif yang lebih efisien dan terpercaya.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CARA KERJA ===== */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1C56] text-center mb-16">
              Cara Kerja FASTIF
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#0A1C56] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[#0A1C56] mb-3">
                  Ajukan Surat
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Pilih jenis surat yang diperlukan dan isi formulir pengajuan dengan data yang lengkap.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#0A1C56] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-[#0A1C56] mb-3">
                  Verifikasi Admin
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Admin akan memverifikasi dokumen dan data yang Anda kirimkan dengan teliti.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#0A1C56] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-[#0A1C56] mb-3">
                  Proses & Selesai
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Surat diproses dan siap diambil. Anda dapat melacak status pengajuan kapan saja.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FITUR UTAMA ===== */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1C56] text-center mb-16">
              Bergabunglah Bersama FASTIF
            </h2>
          </div>
        </section>

        {/* ===== CALL TO ACTION ===== */}
        <section className="bg-gradient-to-r from-[#0A1C56] to-[#1E3A8A] py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap Memulai?
            </h2>
            <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan mahasiswa Informatika yang telah mempermudah proses administrasi mereka melalui FASTIF.
            </p>
            <Link
              href="/login"
              className="inline-block bg-white text-[#0A1C56] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Ajukan Surat Sekarang
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#0A1C56] text-white py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-sm md:text-base">
            © 2025 Fasilitas Surat Informatika. All rights reserved.
          </p>
        </div>
      </footer>

      <ModalDetail data={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
