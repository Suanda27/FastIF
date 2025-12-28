import {
  insertSurat,
  insertPengajuanSurat,
} from "../models/pengajuanSurveyModel.js";
import db from "../config/db.js";

export const pengajuanMagang = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Belum login" });
    }

    const id_user = req.session.user.id_user;
    const { keperluan, instansi } = req.body;
    const file_surat = req.file ? req.file.filename : null;

    // 🔑 IDENTITAS SURAT (WAJIB)
    const jenis_surat = "Surat Izin Magang";

    // 🎯 Ambil template BERDASARKAN NAMA PASTI
    const [rows] = await db
      .promise()
      .query(
        `SELECT id_template FROM template_surat WHERE nama_template = ? LIMIT 1`,
        [jenis_surat]
      );

    const id_template = rows.length ? rows[0].id_template : null;

    // INSERT surat (generic)
    const id_surat = await insertSurat({
      id_user,
      id_template,
      jenis_surat,
      keperluan,
      file_surat,
    });

    // INSERT detail
    await insertPengajuanSurat({
      id_surat,
      keperluan,
      instansi_tujuan: instansi ?? null,
      file_surat,
    });

    res.json({
      success: true,
      message: "Pengajuan Surat Izin Magang berhasil dikirim",
      id_surat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
