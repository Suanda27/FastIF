import { insertSuratSurvey, insertPengajuanSurat } from "../models/pengajuanSurveyModel.js";
import db from "../config/db.js";

export const pengajuanSurvey = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Belum login" });
    }

    const id_user = req.session.user.id_user;
    const { keperluan } = req.body;
    const file_surat = req.file ? req.file.filename : null;

    // Cari id template yang nama_template mengandung "survei" atau "survey"
    const [rows] = await db
      .promise()
      .query(
        "SELECT id_template FROM template_surat WHERE LOWER(nama_template) LIKE '%survei%' OR LOWER(nama_template) LIKE '%survey%' LIMIT 1"
      );

    const id_template = rows.length > 0 ? rows[0].id_template : null;

    // Insert ke tabel surat → dapatkan id_surat baru
    const id_surat = await insertSuratSurvey({
      id_user,
      id_template,
      keperluan,
      file_surat,
    });

    // Insert ke tabel pengajuan_surat
    await insertPengajuanSurat(id_surat, keperluan, file_surat);

    res.json({
      success: true,
      message: "Pengajuan surat survei berhasil dikirim!",
      id_surat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
