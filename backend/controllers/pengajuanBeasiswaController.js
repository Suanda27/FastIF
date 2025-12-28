import { insertSurat } from "../models/pengajuanSurveyModel.js";

export const pengajuanBeasiswa = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Belum login" });
    }

    const id_user = req.session.user.id_user;
    const { keperluan } = req.body;

    // 🔑 IDENTITAS SURAT (WAJIB & EKSPLISIT)
    const jenis_surat = "Surat Beasiswa";

    // ❌ TANPA template
    const id_template = null;

    // Insert ke tabel surat
    const id_surat = await insertSurat({
      id_user,
      id_template,
      jenis_surat,
      keperluan,
      file_surat: null,
    });

    res.json({
      success: true,
      message: "Pengajuan Surat Beasiswa berhasil dikirim",
      id_surat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
