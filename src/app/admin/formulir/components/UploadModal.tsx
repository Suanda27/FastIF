"use client";

import { X } from "lucide-react";

interface UploadModalProps {
  closing: boolean;
  selectedFile: File | null;
  uploadProgress: number;
  onClose: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
}

export default function UploadModal({
  closing,
  selectedFile,
  uploadProgress,
  onClose,
  onFileChange,
  onUpload,
}: UploadModalProps) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex justify-center items-center transition-all duration-300 ${
        closing
          ? "opacity-0 backdrop-blur-none bg-black/0"
          : "opacity-100 backdrop-blur-[10px] bg-black/50"
      }`}
    >
      <div className="absolute inset-0" onClick={onClose}></div>

      <div
        className={`relative bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md transform transition-all duration-300 ${
          closing
            ? "opacity-0 scale-95 translate-y-2"
            : "opacity-100 scale-100 translate-y-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          Upload File Surat
        </h2>

        <input
          type="file"
          onChange={onFileChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {selectedFile && (
          <p className="text-sm text-gray-700 mb-3 text-center">
            File terpilih:{" "}
            <span className="font-medium text-blue-600">
              {selectedFile.name}
            </span>
          </p>
        )}

        <button
          onClick={onUpload}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Mulai Upload
        </button>

        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
