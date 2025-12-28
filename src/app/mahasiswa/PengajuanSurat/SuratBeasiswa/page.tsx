'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Send, CheckCircle } from 'lucide-react';
import SidebarMhs from '../../components/SidebarMhs';
import TextAreaField from '../SuratPengantar/components/TextAreaField';
import StudentHeader from '../../components/StudentHeader';
interface FormData {
  deskripsi: string;
}

export default function SuratBeasiswaPage() {
  const [formData, setFormData] = useState<FormData>({
    deskripsi: '',
  });

  // ----- profile state + fetch (sama seperti SuratSurveiForm) -----
  const [profile, setProfile] = useState<{ nama?: string; nim?: string; jurusan?: string } | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadProfile = async () => {
      try {
        const res = await fetch('http://localhost:8001/api/user/profile', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (!mounted) return;
          setProfile({
            nama: data.nama ?? data.name ?? '',
            nim: data.nim ?? '',
            jurusan: data.jurusan ?? data.department ?? '',
          });
        } else {
          if (mounted) setProfile(null);
        }
      } catch {
        if (mounted) setProfile(null);
      } finally {
        if (mounted) setProfileLoading(false);
      }
    };

    loadProfile();
    return () => {
      mounted = false;
    };
  }, []);
  // ----- end profile -----

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "http://localhost:8001/api/user/pengajuan-beasiswa/beasiswa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            deskripsi: formData.deskripsi,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message ?? "Gagal mengajukan surat beasiswa");
        return;
      }

      setShowSuccess(true);
      setFormData({ deskripsi: "" });
    } catch (error) {
      console.error(error);
      alert("Gagal menghubungi server");
    } finally {
      setIsSubmitting(false);
    }
  };


  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      <SidebarMhs />

      <main className="flex-1 lg:ml-0">
        <StudentHeader/>
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 lg:mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A1C56] mb-1 lg:mb-2">
                  Pengajuan Surat Beasiswa
                </h1>
                <p className="text-sm lg:text-base text-gray-600">

                </p>
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 space-y-6"
            >
              {/* PROFIL MAHASISWA - tampil di dalam form (Nama / NIM / Jurusan) */}
              <div className="mb-4">
                <div className="mb-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <p className="block text-lg font-bold text-[#0A1C56]">Nama</p>
                  <p className="block text-lg font-bold text-[#0A1C56]">NIM</p>
                  <p className="block text-lg font-bold text-[#0A1C56]">Jurusan</p>
                </div>

                <div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-900">{profileLoading ? 'Memuat...' : profile?.nama ?? '—'}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-900">{profileLoading ? 'Memuat...' : profile?.nim ?? '—'}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-900">{profileLoading ? 'Memuat...' : profile?.jurusan ?? '—'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <TextAreaField
                label="Deskripsi"
                placeholder="Jelaskan keperluan surat beasiswa..."
                required
                value={formData.deskripsi}
                onChange={(val) => updateFormData('deskripsi', val)}
                rows={10}
              />

              <div className="flex justify-start pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#0A1C56] hover:bg-[#1976D2]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Ajukan
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1C56] mb-2">
              Berhasil!
            </h3>
            <p className="text-gray-600">
              Pengajuan surat beasiswa Anda telah berhasil dikirim dan akan segera diproses.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
