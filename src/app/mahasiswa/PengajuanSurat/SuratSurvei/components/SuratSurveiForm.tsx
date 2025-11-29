"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileCheck, X, AlertCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import TextAreaField from "../../SuratPengantar/components/TextAreaField";

interface FormErrors {
  keperluan?: string;
  file?: string;
}

export default function SuratSurveiForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [keperluan, setKeperluan] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // VALIDASI FORM
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!keperluan.trim()) {
      newErrors.keperluan = "Keperluan harus diisi";
    }

    // FORMAT BARU: doc, docx, pdf
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
        setErrors((prev) => ({
          ...prev,
          file: "Format file harus .doc, .docx, atau .pdf",
        }));
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  // SUBMIT KE BACKEND
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const form = new FormData();
    form.append("keperluan", keperluan);
    if (selectedFile) form.append("file", selectedFile);

    try {
      const res = await fetch(
        "http://localhost:8001/api/user/pengajuan-surat/survei",
        {
          method: "POST",
          body: form,
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (data.success) {
        router.push("/mahasiswa/StatusSurat");
      }
    } catch (error) {
      console.error(error);
    }

    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* KEperluan */}
          <div>
            <TextAreaField
              label="Keperluan"
              placeholder="Jelaskan tujuan / data yang diperlukan..."
              required
              value={keperluan}
              onChange={(val) => {
                setKeperluan(val);
                if (errors.keperluan) {
                  setErrors((prev) => ({ ...prev, keperluan: undefined }));
                }
              }}
              rows={5}
            />
            {errors.keperluan && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.keperluan}
              </motion.p>
            )}
          </div>

          {/* UPLOAD FILE */}
          <div>
            <label className="block text-lg font-bold text-[#0A1C56] mb-3">
              Unggah Surat (DOC / DOCX / PDF)
            </label>

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
              <input
                ref={fileInputRef}
                type="file"
                accept=".doc,.docx,.pdf"
                className="hidden"
                onChange={handleFileInputChange}
              />

              {!selectedFile ? (
                <label className="flex flex-col items-center justify-center py-10 px-4 cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-[#1976D2] rounded-full mb-3"
                  >
                    <Upload className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Tarik & Lepas
                  </p>
                  <p className="text-xs text-gray-500">
                    atau klik untuk memilih file (.doc / .docx / .pdf)
                  </p>
                </label>
              ) : (
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1976D2] rounded-lg">
                      <FileCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="p-1 hover:bg-red-100 rounded-full"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </motion.button>
                </div>
              )}
            </div>

            {errors.file && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.file}
              </motion.p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0A1C56] hover:bg-[#1976D2]"
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
