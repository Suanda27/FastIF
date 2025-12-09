import db from "../config/db.js";

export const getStatusSuratByUser = (id_user, callback) => {
  const sql = `
    SELECT 
      id_surat,
      jenis_surat,
      tanggal_pengajuan,
      status,
      keterangan,
      keperluan,
      file_surat
    FROM surat
    WHERE id_user = ?
    ORDER BY id_surat DESC
  `;

  db.query(sql, [id_user], callback);
};
