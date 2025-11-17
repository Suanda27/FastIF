import express from "express";
import { upload } from "../config/multerConfig.js";
import uploadsDir from "../config/multerConfig.js";

const router = express.Router();
import path from "path";

let formulirData = [
  { id: 1, title: "Surat Izin Kehadiran", fileName: null, templateFileName: null },
  { id: 2, title: "Surat Survey", fileName: null, templateFileName: null },
  { id: 3, title: "Surat Pengantar", fileName: null, templateFileName: null },
  { id: 4, title: "Surat Izin Magang", fileName: null, templateFileName: null },
];

// GET semua formulir
router.get("/", (req, res) => {
  res.json({ success: true, data: formulirData });
});

// Upload file
router.post("/", upload.single("file"), (req, res) => {
  try {
    const { id, isTemplate } = req.body;
    const parsedId = Number(id);
    const templateFlag = isTemplate === "true" || isTemplate === true;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Tidak ada file yang diunggah." });
    }

    const fileName = req.file.filename;

    formulirData = formulirData.map((item) =>
      item.id === parsedId
        ? {
            ...item,
            ...(templateFlag ? { templateFileName: fileName } : { fileName }),
          }
        : item
    );

    res.json({
      success: true,
      message: templateFlag
        ? "File template berhasil diupload!"
        : "File contoh berhasil diupload!",
      data: formulirData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
  }
});

// Hapus file
router.delete("/", express.json(), (req, res) => {
  try {
    const { id, isTemplate } = req.body;
    const parsedId = Number(id);
    const templateFlag = isTemplate === true || isTemplate === "true";

    formulirData = formulirData.map((item) =>
      item.id === parsedId
        ? {
            ...item,
            ...(templateFlag ? { templateFileName: null } : { fileName: null }),
          }
        : item
    );

    res.json({
      success: true,
      message: "File berhasil dihapus!",
      data: formulirData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
  }
});

export default router;
