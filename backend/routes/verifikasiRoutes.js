import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  let { id_surat, status } = req.body;

  if (!id_surat || !status) {
    return res.status(400).json({ success: false, message: "Data tidak lengkap" });
  }

  status = status.toLowerCase();

  const allowedStatus = ["diproses", "diterima", "ditolak"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status tidak valid"
    });
  }

  const sql = "UPDATE surat SET status = ? WHERE id_surat = ?";

  db.query(sql, [status, id_surat], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengubah status",
      });
    }

    res.json({
      success: true,
      message: "Status berhasil diubah"
    });
  });
});

export default router;
