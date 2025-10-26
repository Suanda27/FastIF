"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileText, ClipboardList, Briefcase, Calendar } from "lucide-react";

import FormulirCard from "./components/FormulirCard";
import UploadModal from "./components/UploadModal";
import ToastNotification from "./components/ToastNotification";

export default function FormulirSuratPage() {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const formulirList = [
    {
      icon: Calendar,
      title: "Surat Izin Kehadiran",
      desc: "Permohonan izin untuk tidak mengikuti perkuliahan",
    },
    {
      icon: ClipboardList,
      title: "Surat Survey",
      desc: "Pengajuan izin survei lapangan",
    },
    {
      icon: FileText,
      title: "Surat Pengantar",
      desc: "Surat pengantar resmi fakultas",
    },
    {
      icon: Briefcase,
      title: "Surat Izin Magang",
      desc: "Izin magang mahasiswa",
    },
  ];

  const handleUploadClick = () => {
    setShowModal(true);
    setUploadProgress(0);
    setSelectedFile(null);
  };

  const handleCloseModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setToast({ message: "❌ Pilih file terlebih dahulu!", type: "error" });
      setTimeout(() => setToast(null), 2500);
      return;
    }

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setToast({ message: "✅ File berhasil diupload!", type: "success" });
          setTimeout(() => setToast(null), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  if (!isMounted) return null;

  return (
    <div
      className={`space-y-6 relative transform transition-all duration-700 ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h1 className="text-2xl font-bold text-gray-800">Formulir Surat</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {formulirList.map((item, i) => (
          <FormulirCard
            key={i}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            onUploadClick={handleUploadClick}
          />
        ))}
      </div>

      {showModal &&
        createPortal(
          <UploadModal
            closing={closing}
            selectedFile={selectedFile}
            uploadProgress={uploadProgress}
            onClose={handleCloseModal}
            onFileChange={handleFileChange}
            onUpload={handleUpload}
          />,
          document.body
        )}

      {toast &&
        createPortal(
          <ToastNotification message={toast.message} type={toast.type} />,
          document.body
        )}
    </div>
  );
}
