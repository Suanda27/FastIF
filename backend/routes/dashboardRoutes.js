import express from "express";
import db from "../config/db.js";

const router = express.Router();

// admin dashboard route
router.get("/", (req, res) => {
  const statsQuery = `
    SELECT
      (SELECT COUNT(*) FROM surat WHERE status = 'diproses') AS pengajuan,
      (SELECT COUNT(*) FROM surat WHERE status = 'ditolak') AS verifikasi,
      (SELECT COUNT(*) FROM surat WHERE status = 'diterima') AS selesai
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
        s.status
      FROM surat s
      JOIN user u ON s.id_user = u.id_user
      ORDER BY s.created_at DESC
    `;

    db.query(tableQuery, (err, tableResult) => {
      if (err) return res.status(500).json({ success: false });

      res.json({
        success: true,
        pengajuan: statsResult[0].pengajuan,
        verifikasi: statsResult[0].verifikasi,
        selesai: statsResult[0].selesai,
        dataSurat: tableResult,
      });
    });
  });
});

export default router;
