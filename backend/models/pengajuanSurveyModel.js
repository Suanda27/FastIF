import db from "../config/db.js";

/**
 * INSERT ke tabel surat
 * MODEL GENERIC (tidak mengunci jenis surat)
 */
export const insertSurat = async ({
  id_user,
  id_template,
  jenis_surat,
  keperluan,
  file_surat,
}) => {
  const sql = `
    INSERT INTO surat 
    (id_user, id_template, jenis_surat, tanggal_pengajuan, status, keperluan, file_surat)
    VALUES (?, ?, ?, NOW(), 'diproses', ?, ?)
  `;

  const [result] = await db
    .promise()
    .query(sql, [id_user, id_template, jenis_surat, keperluan, file_surat]);

  return result.insertId;
};

/**
 * INSERT ke tabel pengajuan_surat (detail)
 */
export const insertPengajuanSurat = async ({
  id_surat,
  keperluan,
  instansi_tujuan,
  file_surat,
}) => {
  const sql = `
    INSERT INTO pengajuan_surat
    (id_surat, keperluan, instansi_tujuan, file_surat)
    VALUES (?, ?, ?, ?)
  `;

  await db
    .promise()
    .query(sql, [id_surat, keperluan, instansi_tujuan, file_surat]);
};
