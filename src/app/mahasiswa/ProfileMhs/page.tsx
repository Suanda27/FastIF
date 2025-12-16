'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SidebarMhs from '../components/SidebarMhs';
import ProfileMhsCard from './components/ProfileMhsCard';
import EditProfileModal from './components/EditProfileModal';
import StudentHeader from '../components/StudentHeader';

interface ProfileAPI {
  id_user: number;
  nama: string;
  nim: string;
  email: string;
  jurusan: string;
  photo?: string;
}

interface ProfileUI {
  name: string;
  nim: string;
  email: string;
  prodi: string;
  photo?: string;
}

export default function ProfileMhsPage() {
  const [profile, setProfile] = useState<ProfileUI | null>(null);
  const [pendingProfile, setPendingProfile] = useState<ProfileUI | null>(null); // 🔥 BARU
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔹 FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          'http://localhost:8001/api/user/profile',
          { credentials: 'include' }
        );

        if (!res.ok) throw new Error('Gagal mengambil profil');

        const data: ProfileAPI = await res.json();

        setProfile({
          name: data.nama,
          nim: data.nim,
          email: data.email,
          prodi: data.jurusan,
          photo: data.photo,
        });
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 SAVE PROFILE
  const handleSaveProfile = async (updatedProfile: ProfileUI) => {
    const res = await fetch(
      'http://localhost:8001/api/user/profile',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: updatedProfile.name,
          email: updatedProfile.email,
          prodi: updatedProfile.prodi,
        }),
      }
    );

    if (!res.ok) {
      throw new Error('Gagal memperbarui profil');
    }

    const result = await res.json();

    // ✅ SIMPAN DULU (JANGAN LANGSUNG setProfile)
    setPendingProfile({
      name: result.profile.nama,
      nim: result.profile.nim,
      email: result.profile.email,
      prodi: result.profile.jurusan,
      photo: result.profile.photo,
    });
  };

  if (loading) return <div className="p-10">Loading profil...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!profile) return <div className="p-10">Profil tidak ditemukan</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMhs />

      <main className="flex-1 pt-2 lg:pt-0">
        <StudentHeader />

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
            <h1 className="text-4xl font-bold text-[#0A1C56] mb-2">
              Profil Mahasiswa
            </h1>
            <p className="text-gray-600 text-lg">
              Kelola informasi profil Anda
            </p>
          </motion.div>

          <ProfileMhsCard
            profile={profile}
            onEditClick={() => setIsEditModalOpen(true)}
          />
        </motion.div>
      </main>

      <EditProfileModal
        isOpen={isEditModalOpen}
        profile={profile}
        onSave={handleSaveProfile}
        onClose={() => {
          setIsEditModalOpen(false);

          // 🔥 UPDATE PROFILE SETELAH MODAL TERTUTUP
          if (pendingProfile) {
            setProfile(pendingProfile);
            setPendingProfile(null);
          }
        }}
      />
    </div>
  );
}
