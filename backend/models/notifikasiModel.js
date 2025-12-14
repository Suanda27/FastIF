import db from "../config/db.js";

export const getNotifikasiMahasiswa = (id_user) => {
  const sql = `
    SELECT
      v.id_verifikasi AS id,
      s.jenis_surat,
      v.status_verifikasi,
      v.tanggal_verifikasi
    FROM verifikasi v
    JOIN surat s ON s.id_surat = v.id_surat
    WHERE s.id_user = ?
    ORDER BY v.tanggal_verifikasi DESC
    LIMIT 20
  `;
   return db.promise().query(sql, [id_user]);
};
