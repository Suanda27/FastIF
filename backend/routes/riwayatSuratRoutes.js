import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET riwayat surat berdasarkan id_user
router.get("/:id_user", (req, res) => {
  const { id_user } = req.params;

  const sql = `
    SELECT 
      s.id_surat,
      s.jenis_surat,
      DATE_FORMAT(s.tanggal_pengajuan, '%d-%m-%Y') AS tanggal,
      s.status
    FROM surat s
    WHERE s.id_user = ?
    ORDER BY s.tanggal_pengajuan DESC
  `;

  db.query(sql, [id_user], (err, result) => {
    if (err) {
      console.error("Error get riwayat:", err);
      return res.status(500).json({ success: false, message: "Gagal mengambil data riwayat" });
    }

    res.json({ success: true, data: result });
  });
});

export default router;
