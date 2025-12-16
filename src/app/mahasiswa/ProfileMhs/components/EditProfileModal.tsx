'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Hash, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  nim: string;
  email: string;
  prodi: string;
  photo?: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditProfileModalProps) {
  // 🔒 local state hanya untuk form
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    nim: '',
    email: '',
    prodi: '',
    photo: '',
  });

  // 🔥 sinkron saat profile BERUBAH atau modal DIBUKA
  useEffect(() => {
    if (isOpen && profile) {
      setFormData(profile);
    }
  }, [isOpen, profile]);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // ⬅️ hanya di sini
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl 
                       -translate-x-1/2 -translate-y-1/2 bg-white 
                       rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0A1C56] to-[#1976D2]">
              <h2 className="text-2xl font-bold text-white">Edit Profil</h2>
              <button
                onClick={onClose}
                className="p-2 text-white rounded-full hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Nama */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-[#0A1C56] mb-2">
                  <User className="w-5 h-5 text-[#1976D2]" />
                  Nama Lengkap
                </label>
                <input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              {/* NIM */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-[#0A1C56] mb-2">
                  <Hash className="w-5 h-5 text-[#1976D2]" />
                  NIM
                </label>
                <input
                  value={formData.nim}
                  onChange={(e) => handleChange('nim', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-[#0A1C56] mb-2">
                  <Mail className="w-5 h-5 text-[#1976D2]" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              {/* Prodi */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-[#0A1C56] mb-2">
                  <GraduationCap className="w-5 h-5 text-[#1976D2]" />
                  Program Studi
                </label>
                <input
                  value={formData.prodi}
                  onChange={(e) => handleChange('prodi', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              {/* Action */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#0A1C56] text-white rounded-lg"
                >
                  Simpan
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
