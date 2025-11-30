import db from "../config/db.js";

// Insert data ke tabel surat
export const insertSurat = (id_user) => {
  const sql = `
    INSERT INTO surat (id_user, id_template, jenis_surat, tanggal_pengajuan, status)
    VALUES (?, 1, 'Surat Izin Kehadiran', NOW(), 'diproses')
  `;
  return db.promise().query(sql, [id_user]);
};

// Insert data ke tabel form_surat_izin
export const insertFormSuratIzin = (data) => {
  const sql = `
    INSERT INTO form_surat_izin
    (id_surat, nama_nohp_orangtua, kelas_perkuliahan, jenis_perizinan, 
     tanggal_mulai, tanggal_selesai, file_chat_dosen_wali,
     file_chat_dosen_pengajar, file_pendukung, file_surat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  return db
    .promise()
    .query(sql, [
      data.id_surat,
      data.namaOrangTua,
      data.kelasPerkuliahan,
      data.jenisPerizinan,
      data.tanggalMulai,
      data.tanggalTerakhir,
      data.file_wali,
      data.file_pengajar,
      data.file_pendukung,
      data.file_surat,
    ]);
};
