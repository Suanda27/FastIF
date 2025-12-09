import db from "../config/db.js";

export const getRiwayatByUserId = (id_user) => {
  return new Promise((resolve, reject) => {
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

    db.query(sql, [id_user], (err, result) => {
      if (err) return reject(err);

      const formatted = result.map((s) => ({
        id: s.id_surat,
        nomorSurat: `FASTIF-${String(s.id_surat).padStart(4, "0")}`,
        jenisSurat: s.jenis_surat,
        tanggal: s.tanggal_pengajuan,
        status:
          s.status === "diterima"
            ? "Selesai"
            : s.status === "diproses"
            ? "Diproses"
            : "Ditangguhkan",
        keperluan: s.keperluan,
        keterangan: s.keterangan,
        file: s.file_surat,
      }));

      resolve(formatted);
    });
  });
};
