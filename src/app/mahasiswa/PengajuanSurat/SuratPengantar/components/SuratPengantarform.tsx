"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileCheck, X, AlertCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import LetterCard from '../../../components/LetterCardMhs';
import TextAreaField from "../../SuratPengantar/components/TextAreaField";

interface FormErrors {
  instansi?: string;
  keperluan?: string;
  file?: string;
}

export default function SuratPengantarForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [templates, setTemplates] = useState<any[]>([]);
  const [templateLoading, setTemplateLoading] = useState(true);

  // Profil user
  const [profile, setProfile] = useState<{ nama?: string; nim?: string; jurusan?: string } | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [instansi, setInstansi] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch Profile
  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/user/profile", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (!mounted) return;
          setProfile({
            nama: data.nama ?? data.name ?? "",
            nim: data.nim ?? "",
            jurusan: data.jurusan ?? data.department ?? "",
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
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/formulir");
        const data = await res.json();
  
        const izinTemplates = data?.data?.filter((t: any) =>
          t.nama_template.toLowerCase().includes("pengantar")
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

  // VALIDASI FORM
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!instansi.trim()) newErrors.instansi = "Instansi tujuan harus diisi";
    if (!keperluan.trim()) newErrors.keperluan = "Keperluan harus diisi";

    if (!selectedFile) {
      newErrors.file = "File harus diunggah";
    } else if (!selectedFile.name.match(/\.(doc|docx|pdf)$/i)) {
      newErrors.file = "Format file harus .doc, .docx, atau .pdf";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.name.match(/\.(doc|docx|pdf)$/i)) {
        setSelectedFile(file);
        setErrors((prev) => ({ ...prev, file: undefined }));
      } else {
        setSelectedFile(null);
        setErrors((prev) => ({ ...prev, file: "Format file harus .doc, .docx, atau .pdf" }));
      }
    }
  };

  // Drag-drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) handleFileChange(files[0]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) handleFileChange(files[0]);
  };

  // SUBMIT KE BACKEND
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const form = new FormData();
    form.append("instansi", instansi);
    form.append("keperluan", keperluan);
    if (selectedFile) form.append("file", selectedFile);

    try {
      const res = await fetch("http://localhost:8001/api/user/pengajuan-pengantar/pengantar", {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        router.push("/mahasiswa/StatusSurat");
      } else {
        alert(data.message ?? "Gagal mengajukan surat.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menghubungi server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* HEADER PROFILE */}
          <div className="mb-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <p className="text-lg font-bold text-[#0A1C56]">Nama</p>
            <p className="text-lg font-bold text-[#0A1C56]">NIM</p>
            <p className="text-lg font-bold text-[#0A1C56]">Jurusan</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4">
            <p className="flex-1 font-medium text-gray-900">{profileLoading ? "Memuat..." : profile?.nama ?? "—"}</p>
            <p className="flex-1 font-medium text-gray-900">{profileLoading ? "Memuat..." : profile?.nim ?? "—"}</p>
            <p className="flex-1 font-medium text-gray-900">{profileLoading ? "Memuat..." : profile?.jurusan ?? "—"}</p>
          </div>

          {/* INSTANSI */}
          <div>
            <label className="block text-lg font-bold text-[#0A1C56] mb-3">Instansi Tujuan</label>
            <input
              type="text"
              value={instansi}
              onChange={(e) => {
                setInstansi(e.target.value);
                if (errors.instansi) setErrors((prev) => ({ ...prev, instansi: undefined }));
              }}
              placeholder="Nama instansi atau lembaga tujuan..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition"
            />
            {errors.instansi && (
              <p className="mt-2 text-sm text-red-500 flex gap-1"><AlertCircle className="w-4 h-4" /> {errors.instansi}</p>
            )}
          </div>

          {/* KEPERLUAN */}
          <div>
            <TextAreaField
              label="Keperluan"
              required
              value={keperluan}
              onChange={(v) => {
                setKeperluan(v);
                if (errors.keperluan) setErrors((prev) => ({ ...prev, keperluan: undefined }));
              }}
              rows={5}
              placeholder="Jelaskan keperluan surat pengantar..."
            />
            {errors.keperluan && (
              <p className="mt-2 text-sm text-red-500 flex gap-1"><AlertCircle className="w-4 h-4" /> {errors.keperluan}</p>
            )}
          </div>

          {/* TEMPLATE SURAT */}
          <div>
            <h3 className="text-lg font-bold text-[#0A1C56] mb-6">
              Template Surat
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

          {/* FILE UPLOAD */}
          <div>
            <label className="block text-lg font-bold text-[#0A1C56] mb-3">Unggah Surat (DOC / DOCX / PDF)</label>

            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl transition-all overflow-hidden ${
                isDragging
                  ? "border-[#1976D2] bg-blue-50"
                  : selectedFile
                  ? "border-green-500 bg-green-50"
                  : errors.file
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <input type="file" ref={fileInputRef} accept=".doc,.docx,.pdf" className="hidden" onChange={handleFileInputChange} />

              {!selectedFile ? (
                <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
                  <motion.div whileHover={{ scale: 1.1 }} className="p-3 bg-[#1976D2] rounded-full mb-3">
                    <Upload className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="text-sm font-medium text-gray-700">Tarik & Lepas</p>
                  <p className="text-xs text-gray-500">atau klik untuk memilih file (.doc / .docx / .pdf)</p>
                </label>
              ) : (
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1976D2] rounded-lg">
                      <FileCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" onClick={() => setSelectedFile(null)} className="p-1 rounded-full hover:bg-red-100">
                    <X className="w-5 h-5 text-red-500" />
                  </motion.button>
                </div>
              )}
            </div>

            {errors.file && (
              <p className="mt-2 text-sm text-red-500 flex gap-1"><AlertCircle className="w-4 h-4" /> {errors.file}</p>
            )}
          </div>

          {/* SUBMIT */}
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
        </form>
      </div>
    </motion.div>
  );
}
