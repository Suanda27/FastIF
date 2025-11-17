import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { id_surat, status } = req.body;

  if (!id_surat || !status) {
    return res.status(400).json({ success: false });
  }

  db.query(
    "UPDATE surat SET status = ? WHERE id_surat = ?",
    [status, id_surat],
    (err) => {
      if (err) {
        return res.status(500).json({ success: false });
      }

      return res.json({ success: true, message: "Status berhasil diubah." });
    }
  );
});

export default router;
