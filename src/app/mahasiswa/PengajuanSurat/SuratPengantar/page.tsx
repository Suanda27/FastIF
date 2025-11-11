'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Send, CheckCircle } from 'lucide-react';
import SidebarMhs from '../../components/SidebarMhs';
import TextAreaField from './components/TextAreaField';
import SuratSurveiForm from '../SuratSurvei/components/SuratSurveiForm';

interface FormData {
  keperluan: string;
  suratFile: File | null;
}

export default function SuratPengantarPage() {
  const [formData, setFormData] = useState<FormData>({
    keperluan: '',
    suratFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        keperluan: '',
        suratFile: null,
      });
    }, 3000);
  };

  const updateFormData = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      <SidebarMhs />

      <main className="flex-1 lg:ml-0">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 lg:mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A1C56] mb-1 lg:mb-2">
                  Pengajuan Surat Pengantar
                </h1>
                <p className="text-sm lg:text-base text-gray-600">
                  Lengkapi formulir di bawah untuk mengajukan surat pengantar
                </p>
              </div>

            </div>
          </motion.div>

          
              <SuratSurveiForm/>
        </div>
              
      </main>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1C56] mb-2">
              Berhasil!
            </h3>
            <p className="text-gray-600">
              Pengajuan surat pengantar Anda telah berhasil dikirim dan akan segera diproses.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
