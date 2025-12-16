'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import Image from 'next/image';

interface ProfileData {
  name?: string;
  nama?: string;
  nim?: string;
  email?: string;
  prodi?: string;
  jurusan?: string;
  photo?: string;
}

interface ProfileMhsCardProps {
  profile: ProfileData;
  onEditClick: () => void;
}

export default function ProfileMhsCard({
  profile,
  onEditClick,
}: ProfileMhsCardProps) {
  const nama = profile.name || profile.nama || '-';
  const prodi = profile.prodi || profile.jurusan || '-';

  const baseAnimation = {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.45 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-r from-[#0A1C56] to-[#1976D2] h-18" />

      <div className="px-8 pb-8">
        <div className="flex flex-col md:flex-row items-center gap-6 -mt-6">
          <div className="w-32 h-32 rounded-full bg-[#0A1C56] border-4 border-white shadow-xl flex items-center justify-center">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={nama}
                width={128}
                height={128}
                className="object-cover rounded-full"
              />
            ) : (
              <User className="w-16 h-16 text-white" />
            )}
          </div>

          <div className="text-center md:text-left mt-4">
            <h1 className="text-3xl font-bold text-[#0A1C56]">
              {nama}
            </h1>
            <p className="text-gray-600">Mahasiswa</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold text-[#0A1C56] mb-6">
            Informasi Pribadi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              {...baseAnimation}
              transition={{ ...baseAnimation.transition, delay: 0.1 }}
            >
              <p className="text-sm text-gray-500">Nama</p>
              <p className="font-semibold text-[#0A1C56]">{nama}</p>
            </motion.div>

            <motion.div
              {...baseAnimation}
              transition={{ ...baseAnimation.transition, delay: 0.2 }}
            >
              <p className="text-sm text-gray-500">NIM</p>
              <p className="font-semibold text-[#0A1C56]">
                {profile.nim}
              </p>
            </motion.div>

            <motion.div
              {...baseAnimation}
              transition={{ ...baseAnimation.transition, delay: 0.3 }}
            >
              <p className="text-sm text-gray-500">Prodi</p>
              <p className="font-semibold text-[#0A1C56]">
                {prodi}
              </p>
            </motion.div>

            <motion.div
              {...baseAnimation}
              transition={{ ...baseAnimation.transition, delay: 0.4 }}
            >
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-[#0A1C56]">
                {profile.email}
              </p>
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onEditClick}
              className="bg-[#0A1C56] hover:bg-[#1976D2] text-white px-8 py-3 rounded-lg"
            >
              Edit Profil
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
