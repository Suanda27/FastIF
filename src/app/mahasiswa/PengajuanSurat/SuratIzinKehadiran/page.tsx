'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Send, CheckCircle } from 'lucide-react';
import SidebarMhs from '../../components/SidebarMhs';
import FormField from './components/FormField';
import FileUpload from './components/FileUpload';

interface FormData {
  namaOrangTua: string;
  kelasPerkuliahan: string;
  namaDosenWali: string;
  jenisPerizinan: string;
  tanggalMulai: string;
  tanggalTerakhir: string;
  suratFile: File | null;
  buktiDosenWali: File | null;
  buktiDosenPengajar: File | null;
  buktiPendukung: File | null;
}

const jenisPerizinanOptions = [
  'Izin Sakit',
  'Izin Shift Kerja',
  'Izin Keperluan Keluarga',
  'Izin Urusan Pribadi',
];

export default function SuratIzinKehadiranPage() {
  const [formData, setFormData] = useState<FormData>({
    namaOrangTua: '',
    kelasPerkuliahan: '',
    namaDosenWali: '',
    jenisPerizinan: '',
    tanggalMulai: '',
    tanggalTerakhir: '',
    suratFile: null,
    buktiDosenWali: null,
    buktiDosenPengajar: null,
    buktiPendukung: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        namaOrangTua: '',
        kelasPerkuliahan: '',
        namaDosenWali: '',
        jenisPerizinan: '',
        tanggalMulai: '',
        tanggalTerakhir: '',
        suratFile: null,
        buktiDosenWali: null,
        buktiDosenPengajar: null,
        buktiPendukung: null,
      });
    }, 3000);
  };

  const updateFormData = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      <SidebarMhs />

      <main className="flex-1 lg:ml-0">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 lg:mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A1C56] mb-1 lg:mb-2">
                  Pengajuan Surat Izin Kehadiran
                </h1>
                <p className="text-sm lg:text-base text-gray-600">
                  Lengkapi formulir di bawah untuk mengajukan surat izin kehadiran
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Nama & Nomor HP Orang Tua/Wali"
                  placeholder="Contoh: Budi Santoso - 081234567890"
                  required
                  value={formData.namaOrangTua}
                  onChange={(val) => updateFormData('namaOrangTua', val)}
                />

                <FormField
                  label="Kelas Perkuliahan"
                  placeholder="Contoh: IF-42-05"
                  required
                  value={formData.kelasPerkuliahan}
                  onChange={(val) => updateFormData('kelasPerkuliahan', val)}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Nama Dosen Wali"
                  placeholder="Contoh: Dr. Ahmad Fauzi, M.Kom"
                  required
                  value={formData.namaDosenWali}
                  onChange={(val) => updateFormData('namaDosenWali', val)}
                />

                <FormField
                  label="Jenis Perizinan"
                  type="select"
                  required
                  value={formData.jenisPerizinan}
                  onChange={(val) => updateFormData('jenisPerizinan', val)}
                  options={jenisPerizinanOptions}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Tanggal Mulai Izin"
                  type="date"
                  required
                  value={formData.tanggalMulai}
                  onChange={(val) => updateFormData('tanggalMulai', val)}
                />

                <FormField
                  label="Tanggal Terakhir Izin"
                  type="date"
                  required
                  value={formData.tanggalTerakhir}
                  onChange={(val) => updateFormData('tanggalTerakhir', val)}
                />
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-bold text-[#0A1C56] mb-4">
                  Dokumen Pendukung
                </h3>
                <div className="space-y-5">
                  <FileUpload
                    label="Unggah Surat"
                    description="Format dapat dilihat di Dashboard"
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(file) => updateFormData('suratFile', file)}
                  />

                  <FileUpload
                    label="Unggah Bukti Persetujuan Dosen Wali"
                    description="Berupa tangkapan layar percakapan (file JPG)"
                    required
                    accept=".jpg,.jpeg,.png"
                    onChange={(file) => updateFormData('buktiDosenWali', file)}
                  />

                  <FileUpload
                    label="Unggah Bukti Persetujuan Dosen Pengajar"
                    description="Berupa tangkapan layar percakapan (file JPG)"
                    required
                    accept=".jpg,.jpeg,.png"
                    onChange={(file) => updateFormData('buktiDosenPengajar', file)}
                  />

                  <FileUpload
                    label="Bukti Pendukung Lain"
                    description="Seperti MC, Surat Perintah Lembur, dll. Dalam bentuk file PDF/JPG"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(file) => updateFormData('buktiPendukung', file)}
                  />
                </div>
              </div>

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
              Pengajuan surat izin kehadiran Anda telah berhasil dikirim dan akan segera diproses.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
