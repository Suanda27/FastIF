'use client';

import { motion } from 'framer-motion';
import { Upload, File, X } from 'lucide-react';
import { useState } from 'react';

interface FileUploadProps {
  label: string;
  description?: string;
  required?: boolean;
  accept?: string;
  onChange?: (file: File | null) => void;
}

export default function FileUpload({
  label,
  description,
  required = false,
  accept = '.pdf,.jpg,.jpeg,.png',
  onChange,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange?.(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0] || null;
    setFile(droppedFile);
    onChange?.(droppedFile);
  };

  const handleRemove = () => {
    setFile(null);
    onChange?.(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[#0A1C56]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-xs text-gray-600 -mt-1">{description}</p>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl transition-all ${
          isDragging
            ? 'border-[#1976D2] bg-blue-50'
            : file
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 bg-gray-50'
        }`}
      >
        {!file ? (
          <label className="flex flex-col items-center justify-center py-8 px-4 cursor-pointer hover:bg-gray-100 rounded-xl transition-colors">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-[#1976D2] rounded-full mb-3"
            >
              <Upload className="w-6 h-6 text-white" />
            </motion.div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Tarik dan Lepas
            </p>
            <p className="text-xs text-gray-500">atau klik untuk memilih file</p>
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              required={required}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1976D2] rounded-lg">
                <File className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleRemove}
              className="p-1 hover:bg-red-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-red-500" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
