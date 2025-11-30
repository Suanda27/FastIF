import {
  getUserStats,
  getUserActivity,
  getTemplates,
} from "../models/dashboardmhsModel.js";

// ==========================
// Statistik Mahasiswa
// ==========================
export const statsController = (req, res) => {
  const userId = req.params.id_user;

  getUserStats(userId, (err, result) => {
    if (err) {
      console.error("❌ Error stats:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil statistik surat",
      });
    }

    const data = result[0] || {};

    res.json({
      success: true,
      data: {
        diajukan: data.diajukan || 0,
        selesai: data.selesai || 0,
        ditolak: data.ditolak || 0,
      },
    });
  });
};

// ==========================
// Aktivitas Mahasiswa
// ==========================
export const aktivitasController = (req, res) => {
  const userId = req.params.id_user;

  getUserActivity(userId, (err, result) => {
    if (err) {
      console.error("❌ Error aktivitas:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil aktivitas terakhir",
      });
    }

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  });
};

// ==========================
// Template Surat
// ==========================
export const templateController = (req, res) => {
  getTemplates((err, result) => {
    if (err) {
      console.error("❌ Error templates:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil template surat",
      });
    }

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  });
};
