import { getProfileByUserId } from "../models/profileModel.js";

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
