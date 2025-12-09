"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import FormulirCard from "./components/FormulirCard";
import UploadModal from "./components/UploadModal";
import ToastNotification from "./components/ToastNotification";

export default function FormulirSuratPage() {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [fadeIn, setFadeIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [templateData, setTemplateData] = useState<any[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [isTemplateUpload, setIsTemplateUpload] = useState(false);

  const API_URL = "http://localhost:8001/api";

  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${API_URL}/formulir`);
      const data = await res.json();
      setTemplateData(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTemplates();
    setIsMounted(true);
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal || showAddModal ? "hidden" : "auto";
  }, [showModal, showAddModal]);

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

  const handleUpload = async () => {
    if (!selectedFile || selectedFormId === null) {
      showToast("❌ Pilih file dahulu!", "error");
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

      showToast("✅ File berhasil diupload!", "success");
      fetchTemplates();
      setShowModal(false);
    } catch {
      showToast("❌ Gagal upload file!", "error");
    }
  };

  const handleDeleteFile = async (id: number, isTemplate = false) => {
    try {
      const res = await fetch(`${API_URL}/formulir/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isTemplate }),
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      showToast("🗑️ File berhasil dihapus", "success");
      fetchTemplates();
    } catch {
      showToast("❌ Gagal menghapus file", "error");
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleCreateTemplate = async () => {
    if (!newTemplateName.trim()) {
      showToast("❌ Nama template wajib diisi!", "error");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/formulir/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama_template: newTemplateName }),
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      showToast("🎉 Template berhasil dibuat!", "success");

      setShowAddModal(false);
      setNewTemplateName("");
      fetchTemplates();
    } catch {
      showToast("❌ Gagal membuat template", "error");
    }
  };

  // -------------------------------------------------
  //  🗑️ HAPUS TEMPLATE SURAT (baru)
  // -------------------------------------------------
  const deleteTemplate = async (id: number) => {
    if (!confirm("Hapus template ini beserta semua file?")) return;

    try {
      const res = await fetch(`${API_URL}/formulir/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      showToast("🗑️ Template berhasil dihapus!", "success");
      fetchTemplates();
    } catch (err) {
      showToast("❌ Gagal menghapus template!", "error");
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className={`space-y-6 transition-all duration-700 ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h1 className="text-2xl font-bold text-gray-800">Formulir Surat</h1>

      <button
        onClick={() => setShowAddModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Tambah Template Baru
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {templateData.length === 0 && (
          <p className="text-gray-500 col-span-2">
            Belum ada template. Silakan tambah.
          </p>
        )}

        {templateData.map((t) => (
          <FormulirCard
            key={t.id_template}
            title={t.nama_template}
            desc={`Formulir untuk ${t.nama_template}`}
            icon={undefined}
            onUploadClick={() => handleUploadClick(t.id_template, false)}
            onUploadTemplateClick={() => handleUploadClick(t.id_template, true)}
            fileUploaded={!!t.file_contoh}
            templateUploaded={!!t.file_template}
            onDeleteFile={(isTemplate?: boolean) =>
              handleDeleteFile(t.id_template, isTemplate)
            }
            onDeleteTemplate={() => deleteTemplate(t.id_template)} // <-- tambahan
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

      {showAddModal &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96 shadow-xl animate-fadeIn">

              <h2 className="text-xl font-semibold mb-4">Tambah Template Baru</h2>

              <input
                type="text"
                placeholder="Nama template surat"
                className="w-full border px-3 py-2 rounded-lg mb-4"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
              />

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Batal
                </button>

                <button
                  onClick={handleCreateTemplate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>,
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
