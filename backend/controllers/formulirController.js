import fs from "fs";
import path from "path";
import {
  getAllTemplates,
  upsertTemplateFile,
  getTemplateFile,
  deleteTemplateFileField,
} from "../models/formulirModel.js";

const TEMPLATE_NAMES = {
  1: "Surat Izin Kehadiran",
  2: "Surat Survey",
  3: "Surat Pengantar",
  4: "Surat Izin Magang",
};

export const fetchTemplates = async (req, res) => {
  try {
    const rows = await getAllTemplates();
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal mengambil data" });
  }
};

export const uploadTemplateFile = async (req, res) => {
  const { id, isTemplate } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "Tidak ada file yang diupload",
    });
  }

  const field = isTemplate === "true" ? "file_template" : "file_contoh";
  const namaTemplate = TEMPLATE_NAMES[id];

  if (!namaTemplate) {
    return res
      .status(400)
      .json({ success: false, message: "ID template tidak valid" });
  }

  try {
    await upsertTemplateFile(id, namaTemplate, field, file.filename);
    res.json({
      success: true,
      message: "File berhasil diupload",
      filename: file.filename,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menyimpan data" });
  }
};

export const deleteTemplateFile = async (req, res) => {
  const { id, isTemplate } = req.body;
  const field = isTemplate ? "file_template" : "file_contoh";

  try {
    const filename = await getTemplateFile(id, field);

    if (filename) {
      const filePath = path.join("uploads", filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await deleteTemplateFileField(id, field);

    res.json({
      success: true,
      message: "File berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal menghapus file" });
  }
};
