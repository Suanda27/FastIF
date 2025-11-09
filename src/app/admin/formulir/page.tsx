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
  const [formulirData, setFormulirData] = useState<any[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [isTemplateUpload, setIsTemplateUpload] = useState(false);

  // ✅ Fetch data dari API dummy internal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/formulir");
        const data = await res.json();
        setFormulirData(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  // buka modal upload
  const handleUploadClick = (id: number, isTemplate: boolean = false) => {
    setSelectedFormId(id);
    setIsTemplateUpload(isTemplate);
    setShowModal(true);
    setUploadProgress(0);
    setSelectedFile(null);
  };

  // tutup modal
  const handleCloseModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 300);
  };

  // pilih file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
  };

  // upload ke API dummy internal
  const handleUpload = async () => {
    if (!selectedFile || selectedFormId === null) {
      setToast({ message: "❌ Pilih file terlebih dahulu!", type: "error" });
      setTimeout(() => setToast(null), 2500);
      return;
    }

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("id", selectedFormId.toString());
      formData.append("isTemplate", isTemplateUpload.toString());

      const res = await fetch("/api/formulir", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      setToast({ message: "✅ " + data.message, type: "success" });
      setTimeout(() => setToast(null), 3000);
      setFormulirData(data.data);
      setShowModal(false);
    } catch (error) {
      setToast({ message: "❌ Gagal upload file", type: "error" });
      setTimeout(() => setToast(null), 2500);
    }
  };

  // hapus file (simulasi API DELETE)
  const handleDeleteFile = async (id: number, isTemplate: boolean = false) => {
    try {
      const res = await fetch("/api/formulir", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isTemplate }),
      });

      const data = await res.json();
      setFormulirData(data.data);
      setToast({ message: "🗑️ File dihapus!", type: "success" });
      setTimeout(() => setToast(null), 2500);
    } catch {
      setToast({ message: "❌ Gagal menghapus file", type: "error" });
      setTimeout(() => setToast(null), 2500);
    }
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
        {formulirData.map((item) => {
          const iconMap: Record<string, any> = {
            "Surat Izin Kehadiran": Calendar,
            "Surat Survey": ClipboardList,
            "Surat Pengantar": FileText,
            "Surat Izin Magang": Briefcase,
          };

          const Icon = iconMap[item.title] || FileText;

          return (
            <FormulirCard
              key={item.id}
              icon={Icon}
              title={item.title}
              desc={`Formulir untuk ${item.title.toLowerCase()}`}
              onUploadClick={() => handleUploadClick(item.id)} // contoh file
              onUploadTemplateClick={() => handleUploadClick(item.id, true)} // ✅ template file
              fileUploaded={!!item.fileName}
              templateUploaded={!!item.templateFileName} // ✅ baru
              onDeleteFile={(isTemplate?: boolean) =>
                handleDeleteFile(item.id, isTemplate)
              } // ✅ ubah sedikit
            />
          );
        })}
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
