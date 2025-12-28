import db from "../config/db.js";

// Ambil semua surat user
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

// Update surat berdasarkan id_surat
export const updateSuratById = (id_surat, data, callback) => {
  const fields = [];
  const values = [];

  if (data.keperluan !== undefined) {
    fields.push("keperluan = ?");
    values.push(data.keperluan);
  }
  if (data.keterangan !== undefined) {
    fields.push("keterangan = ?");
    values.push(data.keterangan);
  }
  if (data.file_surat !== undefined) {
    fields.push("file_surat = ?");
    values.push(data.file_surat);
  }
  if (data.status !== undefined) {       // <-- handle status
    fields.push("status = ?");
    values.push(data.status);
  }

  if (fields.length === 0) {
    return callback(null, { message: "No fields to update" });
  }

  const sql = `UPDATE surat SET ${fields.join(", ")} WHERE id_surat = ?`;
  values.push(id_surat);

  db.query(sql, values, callback);
};
