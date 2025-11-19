import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET status surat sesuai user login (mahasiswa)
router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const id_user = req.session.user.id_user;

  const sql = `
    SELECT 
      id_surat,
      jenis_surat,
      tanggal_pengajuan,
      status
    FROM surat
    WHERE id_user = ?
    ORDER BY id_surat DESC
  `;

  db.query(sql, [id_user], (err, results) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

export default router;
