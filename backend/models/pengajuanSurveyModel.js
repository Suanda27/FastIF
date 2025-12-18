import db from "../config/db.js";

// INSERT ke tabel surat & ambil id_surat
export const insertSuratSurvey = async (data) => {
  const sql = `
    INSERT INTO surat 
    (id_user, id_template, jenis_surat, tanggal_pengajuan, status, keperluan, file_surat)
    VALUES (?, ?, 'Surat Survey', NOW(), 'diproses', ?, ?)
  `;

  const [result] = await db
    .promise()
    .query(sql, [data.id_user, data.id_template, data.keperluan, data.file_surat]);

  return result.insertId; 
};

// INSERT ke tabel pengajuan_surat
export const insertPengajuanSurat = async (id_surat, keperluan, instansi_tujuan, file_surat) => {
  const sql = `
    INSERT INTO pengajuan_surat (id_surat, keperluan, instansi_tujuan, file_surat)
    VALUES (?, ?, ?, ?)
  `;
  await db.promise().query(sql, [id_surat, keperluan, instansi_tujuan, file_surat]);
};
