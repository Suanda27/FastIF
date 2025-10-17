'use client';

import { motion } from 'framer-motion';
import { User, Mail, Hash, GraduationCap } from 'lucide-react';
import Image from 'next/image';

interface ProfileData {
  name: string;
  nim: string;
  email: string;
  prodi: string;
  photo?: string;
}

interface ProfileMhsCardProps {
  profile: ProfileData;
  onEditClick: () => void;
}

export default function ProfileMhsCard({ profile, onEditClick }: ProfileMhsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-r from-[#0A1C56] to-[#1976D2] h-18"></div>

      <div className="px-8 pb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full bg-[#0A1C56] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left mt-4 md:mt-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-[#0A1C56] mb-1"
            >
              {profile.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-lg"
            >
              Mahasiswa
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 border-t border-gray-200 pt-8"
        >
          <h2 className="text-2xl font-bold text-[#0A1C56] mb-6">Informasi Pribadi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <User className="w-4 h-4" />
                <span>Nama</span>
              </div>
              <p className="text-[#0A1C56] font-semibold text-lg">{profile.name}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Hash className="w-4 h-4" />
                <span>NIM</span>
              </div>
              <p className="text-[#0A1C56] font-semibold text-lg">{profile.nim}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>Prodi</span>
              </div>
              <p className="text-[#0A1C56] font-semibold text-lg">{profile.prodi}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </div>
              <p className="text-[#0A1C56] font-semibold text-lg break-all">{profile.email}</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEditClick}
            className="bg-[#0A1C56] hover:bg-[#1976D2] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Edit Profil
          </motion.button>
          <p className="text-gray-400 text-sm">Ubah Kata Sandi</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
