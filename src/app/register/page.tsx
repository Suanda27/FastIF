'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    nama: '',
    nim: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const reduce = useReducedMotion();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const newErrors = {
      nama: '',
      nim: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let hasError = false;

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama tidak boleh kosong';
      hasError = true;
    }

    if (!formData.nim.trim()) {
      newErrors.nim = 'NIM tidak boleh kosong';
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format email tidak valid';
      hasError = true;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Kata sandi tidak boleh kosong';
      hasError = true;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
      hasError = true;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Konfirmasi kata sandi tidak boleh kosong';
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Kata sandi tidak cocok';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      setLoading(false);
      return;
    }

    if (!hasError) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white rounded-xl p-6 shadow"
          >
            <div className="flex flex-col items-center mb-4">
              <Image
                src="/logo-fastif-color.png"
                alt="FastIF Logo"
                width={160}
                height={54}
                className="mb-3"
              />
              <h1 className="text-lg md:text-2xl font-bold text-center text-gray-900">
                Sistem Surat Menyurat Cepat
              </h1>
              <p className="text-sm md:text-base font-medium text-center text-gray-700 mt-1">
                Jurusan Teknik Informatika
              </p>
            </div>

            <div>
              <input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1C56] focus:border-transparent text-gray-900 placeholder:text-gray-500"
              />
              {errors.nama && (
                <p className="mt-1 text-sm text-red-600">{errors.nama}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="nim"
                placeholder="NIM"
                value={formData.nim}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1C56] focus:border-transparent text-gray-900 placeholder:text-gray-500"
              />
              {errors.nim && (
                <p className="mt-1 text-sm text-red-600">{errors.nim}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1C56] focus:border-transparent text-gray-900 placeholder:text-gray-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Kata Sandi"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1C56] focus:border-transparent text-gray-900 placeholder:text-gray-500"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Konfirmasi Kata Sandi"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1C56] focus:border-transparent text-gray-900 placeholder:text-gray-500"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Register button styled & animated like Login */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={reduce ? {} : { scale: 1.02 }}
              whileTap={reduce ? {} : { scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`w-full ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0A1C56] hover:bg-[#00aeff]/90'
              } text-white font-medium py-3 rounded-lg transition-colors`}
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </motion.button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Sudah punya akun?{' '}
              <Link
                href="/login"
                className="text-[#0A1C56] hover:underline font-medium"
              >
                Masuk
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
