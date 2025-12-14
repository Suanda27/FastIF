import { getNotifikasiByUser } from "../models/notifikasiModel.js";

export const getNotifikasiMahasiswa = async (req, res) => {
  // WAJIB login
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const id_user = req.session.user.id_user;

  try {
    const [data] = await getNotifikasiByUser(id_user);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Notif error:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil notifikasi",
    });
  }
};
