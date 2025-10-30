"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileCheck, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FormErrors {
  keperluan?: string;
  file?: string;
}

export default function SuratIzinMagangForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [keperluan, setKeperluan] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!keperluan.trim()) {
      newErrors.keperluan = "Keperluan harus diisi";
    }

    if (!selectedFile) {
      newErrors.file = "File harus diunggah";
    } else if (!selectedFile.name.match(/\.(doc|docx)$/i)) {
      newErrors.file = "Format file harus WORD (.doc atau .docx)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.name.match(/\.(doc|docx)$/i)) {
        setSelectedFile(file);
        setErrors((prev) => ({ ...prev, file: undefined }));
      } else {
        setSelectedFile(null);
        setErrors((prev) => ({
          ...prev,
          file: "Format file harus WORD (.doc atau .docx)",
        }));
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push("/mahasiswa/StatusSurat");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="keperluan"
              className="block text-lg font-medium text-[#0A1C56] mb-3"
            >
              Keperluan
            </label>
            <textarea
              id="keperluan"
              value={keperluan}
              onChange={(e) => {
                setKeperluan(e.target.value);
                if (errors.keperluan) {
                  setErrors((prev) => ({ ...prev, keperluan: undefined }));
                }
              }}
              placeholder="Jelaskan tujuan izin magang..."
              rows={5}
              aria-invalid={!!errors.keperluan}
              aria-describedby={errors.keperluan ? "keperluan-error" : undefined}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1976D2]/20 ${
                errors.keperluan
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-[#1976D2]"
              }`}
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
            {errors.keperluan && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                id="keperluan-error"
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.keperluan}
              </motion.p>
            )}
          </div>

          <div>
            <label
              htmlFor="file-upload"
              className="block text-lg font-medium text-[#0A1C56] mb-3"
            >
              Unggah Surat
            </label>
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-[#1976D2] bg-[#1976D2]/5"
                  : errors.file
                  ? "border-red-500 bg-red-50/50"
                  : "border-gray-300 hover:border-[#1976D2] hover:bg-gray-50/50"
              }`}
              aria-invalid={!!errors.file}
              aria-describedby={errors.file ? "file-error" : undefined}
            >
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept=".doc,.docx"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {selectedFile ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <FileCheck className="w-12 h-12 text-[#1976D2]" />
                  <p className="text-[#0A1C56] font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="text-gray-600 font-medium">
                      Tarik & lepas, atau klik untuk memilih file
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Format: WORD (.doc, .docx)</p>
                  </div>
                </div>
              )}
            </div>
            {errors.file && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                id="file-error"
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.file}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`px-8 py-3 bg-[#0A1C56] text-white font-medium rounded-xl transition-all duration-200 ${
              isSubmitting
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-[#0A1C56]/90 shadow-lg hover:shadow-xl"
            }`}
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {isSubmitting ? "Mengirim..." : "Ajukan"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
