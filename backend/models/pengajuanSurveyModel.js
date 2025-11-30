import db from "../config/db.js";

// Insert data surat survei
export const insertSuratSurvei = (data) => {
  const sql = `
    INSERT INTO surat 
    (id_user, id_template, jenis_surat, tanggal_pengajuan, status, keperluan, file_surat)
    VALUES (?, 3, 'Surat Survei', NOW(), 'diproses', ?, ?)
  `;
  return db
    .promise()
    .query(sql, [data.id_user, data.keperluan, data.file_surat]);
};
