import db from "../config/db.js";

const Dashboard = {
  getStats: (callback) => {
    const statsQuery = `
      SELECT
        (SELECT COUNT(*) FROM surat) AS pengajuan,
        (SELECT COUNT(*) FROM surat WHERE LOWER(status) = 'diproses') AS verifikasi,
        (SELECT COUNT(*) FROM surat WHERE LOWER(status) IN ('diterima', 'ditolak')) AS selesai
      FROM DUAL
    `;

    db.query(statsQuery, callback);
  },

  getTableData: (callback) => {
    const tableQuery = `
      SELECT 
        s.id_surat,
        u.nama,
        u.nim,
        u.jurusan,
        s.jenis_surat AS jenis,
        s.status,
        s.tanggal_pengajuan
      FROM surat s
      JOIN user u ON s.id_user = u.id_user
      ORDER BY s.tanggal_pengajuan DESC
    `;

    db.query(tableQuery, callback);
  },
};

export default Dashboard;
