import db from "../config/db.js";

export const getRiwayatByUserId = (id_user) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        s.id_surat,
        s.jenis_surat,
        DATE_FORMAT(s.tanggal_pengajuan, '%d-%m-%Y') AS tanggal,
        s.status
      FROM surat s
      WHERE s.id_user = ?
      ORDER BY s.tanggal_pengajuan DESC
    `;

    db.query(sql, [id_user], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
