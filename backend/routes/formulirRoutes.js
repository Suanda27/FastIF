import express from "express";
import db from "../config/db.js";
import { upload } from "../config/multerConfig.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Mapping nama template berdasarkan ID card FE
const TEMPLATE_NAMES = {
  1: "Surat Izin Kehadiran",
  2: "Surat Survey",
  3: "Surat Pengantar",
  4: "Surat Izin Magang",
};


// GET — ambil semua template
router.get("/", (req, res) => {
  const sql = "SELECT * FROM template_surat ORDER BY id_template ASC";

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Gagal mengambil data" });
    }

    res.json({ success: true, data: rows });
  });
});

// POST — UPLOAD FILE TEMPLATE / CONTOH
router.post("/upload", upload.single("file"), (req, res) => {
  const { id, isTemplate } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: "Tidak ada file yang diupload" });
  }

  const field = isTemplate === "true" ? "file_template" : "file_contoh";
  const namaTemplate = TEMPLATE_NAMES[id];

  if (!namaTemplate) {
    return res.status(400).json({ success: false, message: "ID template tidak valid" });
  }

  // SQL insert/update otomatis
  const sql = `
    INSERT INTO template_surat (id_template, nama_template, ${field})
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE ${field} = VALUES(${field})
  `;

  db.query(sql, [id, namaTemplate, file.filename], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Gagal menyimpan data" });
    }

    res.json({
      success: true,
      message: "File berhasil diupload",
      filename: file.filename,
    });
  });
});

// DELETE — hapus file template / contoh
router.delete("/delete", express.json(), (req, res) => {
  const { id, isTemplate } = req.body;

  const field = isTemplate ? "file_template" : "file_contoh";
  const sqlGet = `SELECT ${field} FROM template_surat WHERE id_template = ?`;

  db.query(sqlGet, [id], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(500).json({ success: false, message: "Gagal mengambil data" });
    }

    const filename = rows[0][field];

    // Hapus file fisik
    if (filename) {
      const filePath = path.join("uploads", filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    // Set kolom menjadi NULL
    const sqlUpdate = `
      UPDATE template_surat
      SET ${field} = NULL
      WHERE id_template = ?
    `;

    db.query(sqlUpdate, [id], (err) => {
      if (err) return res.status(500).json({ success: false });

      res.json({
        success: true,
        message: "File berhasil dihapus",
      });
    });
  });
});

export default router;
