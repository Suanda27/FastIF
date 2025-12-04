"use client";

import { LucideIcon, FileText } from "lucide-react";

interface FormulirCardProps {
  icon?: LucideIcon; 
  title: string;
  desc: string;
  onUploadClick: () => void;
  onUploadTemplateClick: () => void;
  fileUploaded: boolean;
  templateUploaded: boolean;
  onDeleteFile: (isTemplate?: boolean) => void;
}

export default function FormulirCard({
  icon: Icon = FileText,
  title,
  desc,
  onUploadClick,
  onUploadTemplateClick,
  fileUploaded,
  templateUploaded,
  onDeleteFile,
}: FormulirCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-5 bg-white flex flex-col gap-4 transition-all hover:shadow-md">

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
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-md py-2"
            >
              Edit File
            </button>

            <button
              onClick={() => onDeleteFile(false)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm rounded-md py-2"
            >
              Hapus File
            </button>
          </>
        ) : (
          <button
            onClick={onUploadClick}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md py-2"
          >
            Upload File
          </button>
        )}
      </div>

      <hr />

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

      <div className="flex flex-col gap-2">
        {templateUploaded ? (
          <>
            <button
              onClick={onUploadTemplateClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-md py-2"
            >
              Edit File Template
            </button>

            <button
              onClick={() => onDeleteFile(true)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm rounded-md py-2"
            >
              Hapus File Template
            </button>
          </>
        ) : (
          <button
            onClick={onUploadTemplateClick}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md py-2"
          >
            Upload File Template
          </button>
        )}
      </div>
    </div>
  );
}
