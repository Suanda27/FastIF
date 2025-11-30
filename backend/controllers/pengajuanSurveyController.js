import { insertSuratSurvei } from "../models/pengajuanSurveiModel.js";

export const pengajuanSurvei = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Belum login" });
    }

    const id_user = req.session.user.id_user;
    const { keperluan } = req.body;
    const file_surat = req.file ? req.file.filename : null;

    await insertSuratSurvei({ id_user, keperluan, file_surat });

    res.json({
      success: true,
      message: "Pengajuan surat survei berhasil dikirim!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
