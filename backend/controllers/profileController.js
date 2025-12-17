import {
  getProfileByUserId,
  updateProfileByUserId,
} from "../models/profileModel.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Belum login" });
    }

    const id_user = req.session.user.id_user;

    const profile = await getProfileByUserId(id_user);

    if (!profile) {
      return res.status(404).json({ message: "Profil tidak ditemukan" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PROFILE  
export const updateProfile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Belum login" });
    }

    const id_user = req.session.user.id_user;

    // hanya field yang boleh diubah
    const { name, nim, email } = req.body;

    // validasi sederhana
    if (!name || !email || !nim) {
      return res.status(400).json({
        message: "Nama, Nim, dan Email wajib diisi",
      });
    }

    // Jurusan TIDAK IKUT DIUPDATE
    await updateProfileByUserId(id_user, {
      nama: name,
      nim,
      email,
    });

    // ambil ulang data terbaru
    const updatedProfile = await getProfileByUserId(id_user);

    res.json({
      message: "Profil berhasil diperbarui",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
