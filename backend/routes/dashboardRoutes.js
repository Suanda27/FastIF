import express from "express";
import db from "../config/db.js";

const router = express.Router();

// admin dashboard route
router.get("/", (req, res) => {

  const statsQuery = `
    SELECT
      (SELECT COUNT(*) FROM surat WHERE LOWER(status) = 'diproses') AS pengajuan,
      (SELECT COUNT(*) FROM surat WHERE LOWER(status) = 'ditolak') AS ditolak,
      (SELECT COUNT(*) FROM surat WHERE LOWER(status) = 'diterima') AS selesai
    FROM DUAL
  `;

  db.query(statsQuery, (err, statsResult) => {
    if (err) return res.status(500).json({ success: false });

    const tableQuery = `
      SELECT 
        s.id_surat,
        u.nama,
        u.nim,
        u.jurusan,
        s.jenis_surat AS jenis,
        s.status,
        s.tanggal_pengajuan
      FROM surat s
      JOIN user u ON s.id_user = u.id_user
      ORDER BY s.tanggal_pengajuan DESC
    `;

    db.query(tableQuery, (err, tableResult) => {
      if (err) return res.status(500).json({ success: false });

      res.json({
        success: true,
        pengajuan: statsResult[0].pengajuan,
        ditolak: statsResult[0].ditolak,
        selesai: statsResult[0].selesai,
        dataSurat: tableResult,
      });
    });
  });
});

export default router;
