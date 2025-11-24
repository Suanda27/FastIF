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
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Data dari database
  const [templateData, setTemplateData] = useState<any[]>([]);

  // Card aktif
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [isTemplateUpload, setIsTemplateUpload] = useState(false);

  // URL backend
  const API_URL = "http://localhost:8001/api";

  // GET data dari database
  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${API_URL}/formulir`);
      const data = await res.json();
      setTemplateData(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTemplates(); }, []);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);


  // Open modal upload
  const handleUploadClick = (id: number, isTemplate = false) => {
    setSelectedFormId(id);
    setIsTemplateUpload(isTemplate);
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

  // Upload file
  const handleUpload = async () => {
    if (!selectedFile || selectedFormId === null) {
      setToast({ message: "❌ Pilih file dahulu!", type: "error" });
      setTimeout(() => setToast(null), 2500);
      return;
    }

    setUploadProgress(10);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id", selectedFormId.toString());
    formData.append("isTemplate", isTemplateUpload.toString());

    try {
      const res = await fetch(`${API_URL}/formulir/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      setToast({ message: "✅ File berhasil diupload!", type: "success" });
      setTimeout(() => setToast(null), 2500);

      fetchTemplates();
      setShowModal(false);
    } catch (err) {
      setToast({ message: "❌ Gagal upload file!", type: "error" });
      setTimeout(() => setToast(null), 2500);
    }
  };

  // Delete file
  const handleDeleteFile = async (id: number, isTemplate = false) => {
    try {
      const res = await fetch(`${API_URL}/formulir/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isTemplate }),
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      setToast({ message: "🗑️ File berhasil dihapus", type: "success" });
      setTimeout(() => setToast(null), 2500);

      fetchTemplates();
    } catch {
      setToast({ message: "❌ Gagal menghapus file", type: "error" });
      setTimeout(() => setToast(null), 2500);
    }
  };

  if (!isMounted) return null;

  // Card FE Statis
  const cardList = [
    { id: 1, title: "Surat Izin Kehadiran", icon: Calendar },
    { id: 2, title: "Surat Survey", icon: ClipboardList },
    { id: 3, title: "Surat Pengantar", icon: FileText },
    { id: 4, title: "Surat Izin Magang", icon: Briefcase },
  ];

  return (
    <div
      className={`space-y-6 transition-all duration-700 ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h1 className="text-2xl font-bold text-gray-800">Formulir Surat</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cardList.map((card) => {
          // ambil data dari DB sesuai id card
          const dbData = templateData.find((x) => x.id_template === card.id);

          return (
            <FormulirCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              desc={`Formulir untuk ${card.title}`}
              onUploadClick={() => handleUploadClick(card.id, false)}
              onUploadTemplateClick={() => handleUploadClick(card.id, true)}
              fileUploaded={!!dbData?.file_contoh}
              templateUploaded={!!dbData?.file_template}
              onDeleteFile={(isTemplate?: boolean) =>
                handleDeleteFile(card.id, isTemplate)
              }
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
