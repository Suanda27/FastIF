import db from "../config/db.js";

const Arsip = {
  getAll: (callback) => {
    const query = `
      SELECT 
        s.id_surat,
        u.nama,
        u.nim,
        u.jurusan,
        s.jenis_surat,
        s.tanggal_pengajuan,
        s.status
      FROM surat s
      JOIN user u ON s.id_user = u.id_user
      ORDER BY s.created_at DESC
    `;

    db.query(query, callback);
  },
};

export default Arsip;
