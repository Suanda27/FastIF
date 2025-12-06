import Arsip from "../models/arsipModel.js";

export const getArsipSurat = (req, res) => {
  Arsip.getAll((err, results) => {
    if (err) {
      console.error("❌ Error mengambil arsip:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data arsip surat.",
      });
    }

    res.json({
      success: true,
      message: "Data arsip surat berhasil diambil.",
      data: results,
    });
  });
};
