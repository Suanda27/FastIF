import { insertSurat } from "../models/pengajuanSurveyModel.js";

export const pengajuanLulus = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Belum login" });
    }

    const id_user = req.session.user.id_user;
    const { keperluan } = req.body;

    // 🔑 IDENTITAS SURAT
    const jenis_surat = "Surat Keterangan Lulus";

    // ❌ TIDAK PAKAI TEMPLATE & DETAIL
    const id_template = null;

    const id_surat = await insertSurat({
      id_user,
      id_template,
      jenis_surat,
      keperluan,
      file_surat: null,
    });

    res.json({
      success: true,
      message: "Pengajuan Surat Keterangan Lulus berhasil dikirim",
      id_surat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
