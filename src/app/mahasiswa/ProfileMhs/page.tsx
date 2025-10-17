'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SidebarMhs from '../components/SidebarMhs';
import ProfileMhsCard from './components/ProfileMhsCard';
import EditProfileModal from './components/EditProfileModal';

interface ProfileData {
  name: string;
  nim: string;
  email: string;
  prodi: string;
  photo?: string;
}

const dummyProfile: ProfileData = {
  name: 'Budiono Siregar',
  nim: '3312411123',
  email: 'Budiono@gmail.com',
  prodi: 'Teknik Informatika',
};

export default function ProfileMhsPage() {
  const [profile, setProfile] = useState<ProfileData>(dummyProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <SidebarMhs />

      <main className="flex-1 lg:ml-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 lg:p-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-[#0A1C56] mb-2">Profil Mahasiswa</h1>
            <p className="text-gray-600 text-lg">Kelola informasi profil Anda</p>
          </motion.div>

          <ProfileMhsCard
            profile={profile}
            onEditClick={() => setIsEditModalOpen(true)}
          />
        </motion.div>
      </main>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
