import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = `
    SELECT 
      s.id_surat,
      u.nama,
      u.nim,
      u.jurusan,
      s.jenis_surat,
      s.tanggal_pengajuan,
      s.status
  FROM surat s
  JOIN user u ON s.id_user = u.id_user
  ORDER BY s.created_at DESC
`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data arsip surat.",
      });
    }

    res.json({
      success: true,
      message: "Data arsip surat berhasil diambil.",
      data: results,
    });
  });
});

export default router;
