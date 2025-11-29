import express from "express";
import db from "../config/db.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

// Upload 1 file saja
const uploadSurvei = upload.single("file");

router.post("/survei", uploadSurvei, async (req, res) => {
  try {
    // Ambil dari session (id_user asli)
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Belum login" });
    }

    const id_user = req.session.user.id_user;
    const { keperluan } = req.body;
    const file_surat = req.file ? req.file.filename : null;

    const sql = `
      INSERT INTO surat 
      (id_user, id_template, jenis_surat, tanggal_pengajuan, status, keperluan, file_surat)
      VALUES (?, 3, 'Surat Survei', NOW(), 'diproses', ?, ?)
    `;

    await db.promise().query(sql, [id_user, keperluan, file_surat]);

    res.json({ success: true, message: "Pengajuan surat survei berhasil dikirim!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
