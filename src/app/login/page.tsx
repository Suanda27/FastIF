'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

function Header() {
  const reduce = useReducedMotion();

  return (
    <motion.header
      initial={reduce ? {} : { y: -18, opacity: 0 }}
      animate={reduce ? {} : { y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="bg-[#0A1A4A] py-4 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-fastif-white.png"
            alt="FastIF Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>
    </motion.header>
  );
}

function Footer() {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      initial={reduce ? {} : { y: 18, opacity: 0 }}
      animate={reduce ? {} : { y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="bg-[#0A1A4A] py-6 px-6 mt-12"
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-white text-sm md:text-base">
          © 2025 Fasilitas Surat Informatika. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ⬅️ Tambahkan di sini
  const reduce = useReducedMotion();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // penting buat kirim session cookie
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(
          data.message || "Login gagal, periksa kembali username & password"
        );
        return;
      }

      // ✅ Jika login berhasil
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (data.user.role === "mahasiswa") {
        router.push("/mahasiswa/DashboardMhs");
      } else {
        alert("Role tidak dikenali!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Terjadi kesalahan saat login. Pastikan server backend berjalan.");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-12 w-full max-w-md"
          initial={reduce ? {} : "hidden"}
          animate={reduce ? {} : "visible"}
          variants={cardVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <Image
              src="/logo-fastif-color.png"
              alt="FastIF Logo"
              width={180}
              height={60}
              className="mb-4"
            />
            <h1 className="text-lg md:text-2xl font-bold text-center text-gray-900">
              Sistem Surat Menyurat Cepat
            </h1>
            <p className="text-sm md:text-base font-medium text-center text-gray-700 mt-1">
              Jurusan Teknik Informatika
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nama Pengguna"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1C56] focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Kata Sandi Pengguna"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1C56] focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={reduce ? {} : { scale: 1.02 }}
              whileTap={reduce ? {} : { scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0A1C56] hover:bg-[#00aeff]/90"
              } text-white font-medium py-3 rounded-lg transition-colors`}
            >
              {loading ? "Memproses..." : "Masuk"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Belum punya akun? Hubungi TU.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
