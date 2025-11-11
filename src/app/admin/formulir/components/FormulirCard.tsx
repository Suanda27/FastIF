"use client";
import { LucideIcon } from "lucide-react";

interface FormulirCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  onUploadClick: () => void;
  onUploadTemplateClick: () => void;
  fileUploaded: boolean;
  templateUploaded: boolean; // ✅ Tambahan
  onDeleteFile: (isTemplate?: boolean) => void; // ✅ Tambahan opsional
}

export default function FormulirCard({
  icon: Icon,
  title,
  desc,
  onUploadClick,
  onUploadTemplateClick,
  fileUploaded,
  templateUploaded, // ✅
  onDeleteFile,
}: FormulirCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-5 bg-white flex flex-col gap-4 transition-all hover:shadow-md">
      {/* Bagian File Contoh */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-100 rounded-md">
          <Icon className="text-blue-600" size={22} />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">Contoh File {title}</h2>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {fileUploaded ? (
          <>
            <button
              onClick={onUploadClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md py-2 transition-all"
            >
              Edit File
            </button>
            <button
              onClick={() => onDeleteFile(false)} // ❗️false artinya bukan template
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md py-2 transition-all"
            >
              Hapus File
            </button>
          </>
        ) : (
          <button
            onClick={onUploadClick}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md py-2 transition-all"
          >
            Upload File
          </button>
        )}
      </div>

      <hr className="my-1" />

      {/* Bagian File Template */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 rounded-md">
          <Icon className="text-blue-500" size={20} />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">Template File {title}</h2>
          <p className="text-sm text-gray-500">
            File Template Surat Kosong untuk Mahasiswa
          </p>
        </div>
      </div>

      {/* ✅ Tombol khusus Template File */}
      <div className="flex flex-col gap-2">
        {templateUploaded ? (
          <>
            <button
              onClick={onUploadTemplateClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md py-2 transition-all"
            >
              Edit File Template
            </button>
            <button
              onClick={() => onDeleteFile(true)} // ✅ true = hapus template
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md py-2 transition-all"
            >
              Hapus File Template
            </button>
          </>
        ) : (
          <button
            onClick={onUploadTemplateClick}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md py-2 transition-all"
          >
            Upload File Template
          </button>
        )}
      </div>
    </div>
  );
}
