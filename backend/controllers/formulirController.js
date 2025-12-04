import fs from "fs";
import path from "path";
import {
  createTemplateModel,
  getAllTemplates,
  getTemplateById,
  upsertTemplateFile,
  getTemplateFile,
  deleteTemplateFileField,
} from "../models/formulirModel.js";

export const createTemplate = async (req, res) => {
  try {
    const { nama_template } = req.body;

    if (!nama_template || nama_template.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Nama template wajib diisi",
      });
    }

    const id = await createTemplateModel(nama_template.trim());

    res.json({
      success: true,
      message: "Template berhasil dibuat",
      id,
    });
  } catch (err) {
    console.error("CREATE TEMPLATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Gagal membuat template",
    });
  }
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
  try {
    const { id, isTemplate } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada file diupload",
      });
    }

    const field = isTemplate === "true" ? "file_template" : "file_contoh";

    // 🔥 Ambil nama template dari database
    const template = await getTemplateById(id);
    if (!template) {
      return res.status(400).json({
        success: false,
        message: "ID template tidak ditemukan",
      });
    }

    const namaTemplate = template.nama_template;

    await upsertTemplateFile(id, namaTemplate, field, file.filename);

    res.json({
      success: true,
      message: "File berhasil diupload",
      filename: file.filename,
    });
  } catch (err) {
    console.error("UPLOAD TEMPLATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Gagal menyimpan file",
    });
  }
};

export const deleteTemplateFile = async (req, res) => {
  try {
    const { id, isTemplate } = req.body;
    const field = isTemplate ? "file_template" : "file_contoh";

    const filename = await getTemplateFile(id, field);

    if (filename) {
      const filePath = path.join("uploads", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await deleteTemplateFileField(id, field);

    res.json({
      success: true,
      message: "File berhasil dihapus",
    });
  } catch (err) {
    console.error("DELETE TEMPLATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus file",
    });
  }
};
