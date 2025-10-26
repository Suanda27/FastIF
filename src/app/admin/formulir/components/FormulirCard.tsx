"use client";

import { LucideIcon } from "lucide-react";

interface FormulirCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  onUploadClick: () => void;
}

export default function FormulirCard({
  icon: Icon,
  title,
  desc,
  onUploadClick,
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

      <button
        onClick={onUploadClick}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md py-2 transition-all"
      >
        Upload File
      </button>

      <hr className="my-1" />

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

      <button
        onClick={onUploadClick}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md py-2 transition-all"
      >
        Upload File
      </button>
    </div>
  );
}
