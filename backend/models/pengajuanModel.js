import db from "../config/db.js";

// AUTO SELECT TEMPLATE UNTUK SURAT IZIN
export const insertSuratIzin = async (id_user) => {
  const [template] = await db.promise().query(
    `SELECT id_template
     FROM template_surat
     WHERE nama_template LIKE '%izin%'
        OR nama_template LIKE '%kehadiran%'
     LIMIT 1`
  );

  const id_template = template.length > 0 ? template[0].id_template : null;

  const sql = `
    INSERT INTO surat (
      id_user,
      id_template,
      jenis_surat,
      tanggal_pengajuan,
      status
    )
    VALUES (?, ?, 'Surat Izin Kehadiran', NOW(), 'diproses')
  `;

  return db.promise().query(sql, [id_user, id_template]);
};

// UPDATE file_surat DI TABEL surat
export const updateSuratFile = (id_surat, file_surat) => {
  return db.promise().query(
    `UPDATE surat SET file_surat = ? WHERE id_surat = ?`,
    [file_surat, id_surat]
  );
};

// UPDATE KEPERLUAN DI TABEL surat
export const updateSuratKeperluan = (id_surat, keperluan) => {
  return db.promise().query(
    `UPDATE surat SET keperluan = ? WHERE id_surat = ?`,
    [keperluan, id_surat]
  );
};

// INSERT FORM SURAT IZIN
export const insertFormSuratIzin = (data) => {
  const sql = `
    INSERT INTO form_surat_izin
    (id_surat, nama_orangtua, nohp_orangtua, kelas_perkuliahan, nama_dosen_wali,
     jenis_perizinan, tanggal_mulai, tanggal_selesai,
     file_chat_dosen_wali, file_chat_dosen_pengajar, file_pendukung, file_surat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  return db.promise().query(sql, [
    data.id_surat,
    data.namaOrangTua,
    data.noHpOrangTua,
    data.kelasPerkuliahan,
    data.namaDosenWali,
    data.jenisPerizinan,
    data.tanggalMulai,
    data.tanggalTerakhir,
    data.file_wali,
    data.file_pengajar,
    data.file_pendukung,
    data.file_surat,
  ]);
};
