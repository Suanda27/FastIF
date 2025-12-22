import db from "../config/db.js";

// Ambil Statistik Mahasiswa
export const getUserStats = (userId, callback) => {
  const query = `
        SELECT 
            SUM(CASE WHEN status = 'diproses' THEN 1 ELSE 0 END) AS diajukan,
            SUM(CASE WHEN status = 'diterima' THEN 1 ELSE 0 END) AS selesai,
            SUM(CASE WHEN status = 'ditolak' THEN 1 ELSE 0 END) AS ditolak
        FROM surat
        WHERE id_user = ?;
    `;

  db.query(query, [userId], callback);
};

// Aktivitas Mahasiswa
export const getUserActivity = (userId, callback) => {
  const query = `
    SELECT 
      id_surat,
      tanggal_pengajuan AS created_at,
      jenis_surat AS jenis,
      status
    FROM surat
    WHERE id_user = ?;
  `;

  db.query(query, [userId], callback);
};

// Ambil Template Surat
export const getTemplates = (callback) => {
  const query = "SELECT * FROM template_surat";
  db.query(query, callback);
};
