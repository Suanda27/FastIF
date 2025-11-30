import Dashboard from "../models/dashboardModel.js";

export const getDashboardData = (req, res) => {
  Dashboard.getStats((err, statsResult) => {
    if (err) {
      console.error("❌ Error mengambil statistik dashboard:", err);
      return res.status(500).json({ success: false });
    }

    Dashboard.getTableData((err, tableResult) => {
      if (err) {
        console.error("❌ Error mengambil tabel dashboard:", err);
        return res.status(500).json({ success: false });
      }

      res.json({
        success: true,
        pengajuan: statsResult[0].pengajuan,
        verifikasi: statsResult[0].verifikasi,
        selesai: statsResult[0].selesai,
        dataSurat: tableResult,
      });
    });
  });
};
