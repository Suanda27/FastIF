'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Hash,
  GraduationCap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  nim: string;
  email: string;
  prodi: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => Promise<void>;
}

/* =======================
   SUCCESS MODAL
======================= */
function SuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed left-1/2 top-1/2 z-[61]
              w-full max-w-md -translate-x-1/2 -translate-y-1/2
              bg-white rounded-2xl p-8 text-center shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center
              rounded-full bg-green-100">
              <CheckCircle size={48} className="text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-[#0A1C56] mb-2">
              Berhasil!
            </h2>

            <p className="text-gray-600 mb-6">
              Profil Anda berhasil diperbarui.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-[#0A1C56] text-white py-2 rounded-lg"
            >
              OK
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* =======================
   MAIN MODAL
======================= */
export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notif, setNotif] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(profile);
      setNotif(null);
      setShowSuccess(false);
    }
  }, [isOpen, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    try {
      await onSave(formData);
      setShowSuccess(true);
    } catch (err: any) {
      setNotif({
        type: 'error',
        message: err.message || 'Gagal memperbarui profil',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div className="fixed inset-0 bg-black/60 z-50" />

            {/* Modal */}
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl
                -translate-x-1/2 -translate-y-1/2 bg-white
                rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-[#0A1C56] text-white">
                <h2 className="text-2xl font-bold">Edit Profil</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/20"
                >
                  <X />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {notif && (
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg text-white
                    ${notif.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
                  >
                    {notif.type === 'success' ? (
                      <CheckCircle size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    {notif.message}
                  </div>
                )}

                {/* Nama */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-semibold text-[#0A1C56]">
                    <User size={18} className="text-[#1976D2]" />
                    Nama Lengkap
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg text-[#0A1C56] focus:ring-2 focus:ring-[#0A1C56]"
                  />
                </div>

                {/* NIM */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-semibold text-[#0A1C56]">
                    <Hash size={18} className="text-[#1976D2]" />
                    NIM
                  </label>
                  <input
                    value={formData.nim}
                    disabled
                    className="w-full px-4 py-3 border rounded-lg text-[#0A1C56] bg-gray-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-semibold text-[#0A1C56]">
                    <Mail size={18} className="text-[#1976D2]" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg text-[#0A1C56] focus:ring-2 focus:ring-[#0A1C56]"
                  />
                </div>

                {/* Prodi */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-semibold text-[#0A1C56]">
                    <GraduationCap size={18} className="text-[#1976D2]" />
                    Program Studi
                  </label>
                  <input
                    value={formData.prodi}
                    onChange={(e) =>
                      setFormData({ ...formData, prodi: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg text-[#0A1C56] focus:ring-2 focus:ring-[#0A1C56]"
                  />
                </div>

                {/* Action */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 rounded-lg border border-[#0A1C56] text-[#0A1C56] font-semibold hover:bg-[#0A1C56]/10 transition"
                  >
                    Batal
                  </button>
                  <button
                    disabled={saving}
                    className="flex-1 py-3 bg-[#0A1C56] text-white rounded-lg"
                  >
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SUCCESS */}
      <SuccessModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
      />
    </>
  );
}
