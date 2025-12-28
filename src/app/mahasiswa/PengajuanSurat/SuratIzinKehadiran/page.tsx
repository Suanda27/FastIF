'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import SidebarMhs from '../../components/SidebarMhs';
import FormField from './components/FormField';
import FileUpload from './components/FileUpload';
import StudentHeader from '../../components/StudentHeader';
import LetterCard from '../../components/LetterCardMhs';
import { useRouter } from "next/navigation";

interface FormData {
  namaOrangTua: string;
  noHpOrangTua: string; // <-- new: nomor HP terpisah
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
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    namaOrangTua: '',
    noHpOrangTua: '',
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

  const [templates, setTemplates] = useState<any[]>([]);
  const [templateLoading, setTemplateLoading] = useState(true);


  // ----- NEW: profile state + fetch -----
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
          // non-OK: keep null but don't throw
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

  useEffect(() => {
  const loadTemplates = async () => {
    try {
      const res = await fetch("http://localhost:8001/api/formulir");
      const data = await res.json();

      const izinTemplates = data?.data?.filter((t: any) =>
        t.nama_template.toLowerCase().includes("izin perkuliahan")
      );

      setTemplates(izinTemplates || []);
    } catch (err) {
      console.error("Gagal memuat template izin", err);
      setTemplates([]);
    } finally {
      setTemplateLoading(false);
    }
  };

  loadTemplates();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [closeTimeout, setCloseTimeout] = useState<any>(null);

  const resetForm = () => {
    setFormData({
      namaOrangTua: '',
      noHpOrangTua: '', // <-- reset
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

    setResetKey((prev) => prev + 1);
  };

  const updateFormData = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.append("namaOrangTua", formData.namaOrangTua);
    form.append("noHpOrangTua", formData.noHpOrangTua); // <-- append phone
    form.append("kelasPerkuliahan", formData.kelasPerkuliahan);
    form.append("namaDosenWali", formData.namaDosenWali);
    form.append("jenisPerizinan", formData.jenisPerizinan);
    form.append("tanggalMulai", formData.tanggalMulai);
    form.append("tanggalTerakhir", formData.tanggalTerakhir);

    if (formData.suratFile) form.append("suratFile", formData.suratFile);
    if (formData.buktiDosenWali) form.append("buktiDosenWali", formData.buktiDosenWali);
    if (formData.buktiDosenPengajar) form.append("buktiDosenPengajar", formData.buktiDosenPengajar);
    if (formData.buktiPendukung) form.append("buktiPendukung", formData.buktiPendukung);

    try {
      await fetch("http://localhost:8001/api/user/pengajuan-surat/izin-kehadiran", {
        method: "POST",
        body: form,
        credentials: "include",
      });

      setShowSuccess(true);
      setIsSubmitting(false);

      const timeout = setTimeout(() => {
        setShowSuccess(false);
        resetForm();
      router.push("/mahasiswa/StatusSurat");
      }, 2000);

      setCloseTimeout(timeout);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      <SidebarMhs />

      <main className="flex-1 lg:ml-0">
        <StudentHeader />
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          
          {/* Judul */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A1C56]">
              Pengajuan Izin Kehadiran
            </h1>
          </motion.div>

          {/* FORM */}
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
             {/* PROFIL MAHASISWA DI DALAM FORM (satu kotak dengan field lain) */}
             <div className="mb-4">
               <div className="mb-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <p className="block text-base  font-bold text-[#0A1C56]">Nama</p>
                 <p className="block text-base font-bold text-[#0A1C56]">NIM</p>
                 <p className="block text-base font-bold text-[#0A1C56]">Jurusan</p>
               </div>

               <div>
                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                   <div className="flex-1 min-w-0">
                     <p className="font-medium text-gray-900">{profileLoading ? 'Memuat...' : profile?.nama ?? '—'}</p>
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="font-medium text-gray-900">{profileLoading ? 'Memuat...' : profile?.nim ?? '—'}</p>
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="font-medium text-gray-900">{profileLoading ? 'Memuat...' : profile?.jurusan ?? '—'}</p>
                   </div>
                 </div>
               </div>
             </div>

              {/* NAMA & NO HP ORTU (dua kolom, proporsional) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Nama Orang Tua / Wali"
                  placeholder="Contoh: Budi Santoso"
                  required
                  value={formData.namaOrangTua}
                  onChange={(val) => updateFormData('namaOrangTua', val)}
                />

                <FormField
                  label="No. HP Orang Tua / Wali"
                  placeholder="Contoh: 081234567890"
                  type="text"
                  required
                  value={formData.noHpOrangTua}
                  onChange={(val) => updateFormData('noHpOrangTua', val)}
                />
              </div>

              {/* Kelas Perkuliahan & Nama Dosen Wali (tetap dua kolom) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Kelas Perkuliahan"
                  placeholder="Contoh: IF-42-05"
                  required
                  value={formData.kelasPerkuliahan}
                  onChange={(val) => updateFormData('kelasPerkuliahan', val)}
                />

                <FormField
                  label="Nama Dosen Wali"
                  placeholder="Contoh: Dr. Ahmad Fauzi, M.Kom"
                  required
                  value={formData.namaDosenWali}
                  onChange={(val) => updateFormData('namaDosenWali', val)}
                />
              </div>

              {/* Jenis Perizinan & tanggal (tetap seperti semula) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Jenis Perizinan"
                  type="select"
                  required
                  value={formData.jenisPerizinan}
                  onChange={(val) => updateFormData('jenisPerizinan', val)}
                  options={jenisPerizinanOptions}
                />

                <FormField
                  label="Tanggal Mulai Izin"
                  type="date"
                  required
                  value={formData.tanggalMulai}
                  onChange={(val) => updateFormData('tanggalMulai', val)}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Tanggal Terakhir Izin"
                  type="date"
                  required
                  value={formData.tanggalTerakhir}
                  onChange={(val) => updateFormData('tanggalTerakhir', val)}
                />
              </div>

              {/* TEMPLATE SURAT IZIN */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-bold text-[#0A1C56] mb-4">
                  Template Surat Izin
                </h3>

                {templateLoading ? (
                  <p className="text-sm text-gray-500">Memuat template...</p>
                ) : templates.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Template surat belum tersedia.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templates.map((tpl: any) => (
                      <LetterCard
                        key={tpl.id_template}
                        title={tpl.nama_template}
                        exampleLink={
                          tpl.file_contoh
                            ? `http://localhost:8001/uploads/${tpl.file_contoh}`
                            : null
                        }
                        templateLink={
                          tpl.file_template
                            ? `http://localhost:8001/uploads/${tpl.file_template}`
                            : null
                        }
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Dokumen Pendukung */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-bold text-[#0A1C56] mb-4">Dokumen Pendukung</h3>
                <div className="space-y-5">
                  <FileUpload
                    key={resetKey + "-surat"}
                    label="Unggah Surat"
                    description="Format dapat dilihat di Dashboard"
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(file) => updateFormData('suratFile', file)}
                  />

                  <FileUpload
                    key={resetKey + "-wali"}
                    label="Unggah Bukti Persetujuan Dosen Wali"
                    description="Berupa tangkapan layar percakapan (file JPG)"
                    required
                    accept=".jpg,.jpeg,.png"
                    onChange={(file) => updateFormData('buktiDosenWali', file)}
                  />

                  <FileUpload
                    key={resetKey + "-pengajar"}
                    label="Unggah Bukti Persetujuan Dosen Pengajar"
                    description="Berupa tangkapan layar percakapan (file JPG)"
                    required
                    accept=".jpg,.jpeg,.png"
                    onChange={(file) => updateFormData('buktiDosenPengajar', file)}
                  />

                  <FileUpload
                    key={resetKey + "-pendukung"}
                    label="Bukti Pendukung Lain"
                    description="Seperti MC, Surat Perintah Lembur, dll."
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
                    isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#0A1C56] hover:bg-[#1976D2]"
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

      {/* POPUP SUKSES */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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

            <h3 className="text-2xl font-bold text-[#0A1C56] mb-2">Berhasil!</h3>

            <p className="text-gray-600 mb-6">
              Pengajuan Izin Kehadiran Anda telah berhasil dikirim dan akan segera diproses.
            </p>

            <button
              onClick={() => {
                setShowSuccess(false);
                clearTimeout(closeTimeout);
                resetForm();
                router.push("/mahasiswa/StatusSurat");
              }}
              className="px-6 py-2 rounded-lg bg-[#0A1C56] text-white font-semibold shadow-md hover:bg-[#1976D2] transition-all"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
