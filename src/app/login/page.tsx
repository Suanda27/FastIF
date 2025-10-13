'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push('/mahasiswa/dashboard_mhs');
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo-fastif-color.png"
            alt="FastIF Logo"
            width={180}
            height={60}
            className="mb-6"
          />
          <h1 className="text-xl md:text-2xl font-bold text-center text-gray-900">
            Sistem Surat Menyurat Cepat
          </h1>
          <p className="text-lg md:text-xl font-medium text-center text-gray-900 mt-1">
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

          <button
            type="submit"
            className="w-full bg-[#0A1C56] hover:bg-[#00aeff]/90 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Belum punya akun? Hubungi TU.
        </p>
      </div>
    </div>
  );
}
