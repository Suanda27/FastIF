import db from "../config/db.js";

// Update Status Surat
export const updateSuratStatus = (id_surat, status) => {
  return db
    .promise()
    .query(`UPDATE surat SET status = ? WHERE id_surat = ?`, [
      status,
      id_surat,
    ]);
};

// Update Keterangan Surat
export const updateSuratKeterangan = (id_surat, keterangan) => {
  return db.promise().query(
    `UPDATE surat SET keterangan = ? WHERE id_surat = ?`,
    [keterangan, id_surat]
  );
};


// INSERT LOG VERIFIKASI (BARU)
export const insertVerifikasiLog = (
  id_surat,
  id_user,
  status_verifikasi,
  catatan = null
) => {
  return db.promise().query(
    `INSERT INTO verifikasi 
      (id_surat, id_user, tanggal_verifikasi, catatan, status_verifikasi)
     VALUES (?, ?, NOW(), ?, ?)`,
    [id_surat, id_user, catatan, status_verifikasi]
  );
};

// DETAIL SURAT
export const getSuratDetailById = async (id_surat) => {
  const [surat] = await db.promise().query(
    `SELECT 
        s.id_surat,
        s.jenis_surat,
        s.keperluan,
        s.status,
        s.file_surat,
        s.tanggal_pengajuan,
        u.nama,
        u.nim,
        u.jurusan
     FROM surat s
     JOIN user u ON s.id_user = u.id_user
     WHERE s.id_surat = ?`,
    [id_surat]
  );

  if (surat.length === 0) return null;
  const base = surat[0];

  // Jika surat izin
  if (base.jenis_surat === "Surat Izin Kehadiran") {
    const [izin] = await db.promise().query(
      `SELECT * FROM form_surat_izin WHERE id_surat = ?`,
      [id_surat]
    );

    return {
      ...base,
      detail: izin[0] || null,
      files: [
        izin[0]?.file_surat,
        izin[0]?.file_chat_dosen_wali,
        izin[0]?.file_chat_dosen_pengajar,
        izin[0]?.file_pendukung,
      ].filter(Boolean),
    };
  }

  // Jika surat survei
  const [pengajuan] = await db.promise().query(
    `SELECT * FROM pengajuan_surat WHERE id_surat = ?`,
    [id_surat]
  );

  return {
    ...base,
    detail: pengajuan[0] || null,
    files: [base.file_surat].filter(Boolean),
  };
};

// DATA SURAT DIPROSES
export const getSuratDiproses = () => {
  return db.promise().query(
    `SELECT 
        s.id_surat,
        s.jenis_surat,
        s.keperluan,
        s.tanggal_pengajuan,
        s.status,
        u.nama,
        u.nim
     FROM surat s
     JOIN user u ON s.id_user = u.id_user
     WHERE s.status = 'diproses'
     ORDER BY s.tanggal_pengajuan DESC`
  );
};
