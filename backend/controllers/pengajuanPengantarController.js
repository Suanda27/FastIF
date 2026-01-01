import {
  insertSurat,
  insertPengajuanSurat,
} from "../models/pengajuanSurveyModel.js";
import db from "../config/db.js";

export const pengajuanPengantar = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Belum login" });
    }

    const id_user = req.session.user.id_user;
    const { keperluan, instansi } = req.body;
    const file_surat = req.file ? req.file.filename : null;
    const jenis_surat = "Surat Pengantar";

    // Ambil template berdasarkan jenis surat (BUKAN LIKE)
    let keyword = jenis_surat.toLowerCase();
    if (keyword.includes("surat pengantar") || keyword.includes("pengantar")) {
      keyword = "surat pengantar";
    }

    const [rows] = await db
      .promise()
      .query(
        `SELECT id_template
          FROM template_surat
          WHERE LOWER(nama_template) LIKE ?
          LIMIT 1`,
        [`%${keyword}%`]
      );

    const id_template = rows.length ? rows[0].id_template : null;


    // Insert ke tabel surat (GENERIC MODEL)
    const id_surat = await insertSurat({
      id_user,
      id_template,
      jenis_surat,
      keperluan,
      file_surat,
    });

    // Insert ke tabel detail (pengajuan_surat)
    await insertPengajuanSurat({
      id_surat,
      keperluan,
      instansi_tujuan: instansi ?? null,
      file_surat,
    });

    res.json({
      success: true,
      message: "Pengajuan Surat Pengantar berhasil dikirim",
      id_surat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
