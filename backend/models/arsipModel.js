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
        s.status,
        s.keperluan AS surat_keperluan,
        s.file_surat AS surat_file,

        -- DETAIL SURAT IZIN
        fsi.nama_orangtua,
        fsi.nohp_orangtua,
        fsi.kelas_perkuliahan,
        fsi.nama_dosen_wali,
        fsi.jenis_perizinan,
        fsi.tanggal_mulai,
        fsi.tanggal_selesai,
        fsi.file_chat_dosen_wali,
        fsi.file_chat_dosen_pengajar,
        fsi.file_pendukung,

        -- DETAIL PENGAJUAN SURAT
        ps.keperluan AS ps_keperluan,
        ps.file_surat AS ps_file_surat,
        ps.deskripsi AS ps_deskripsi

      FROM surat s
      JOIN user u ON s.id_user = u.id_user
      LEFT JOIN form_surat_izin fsi ON fsi.id_surat = s.id_surat
      LEFT JOIN pengajuan_surat ps ON ps.id_surat = s.id_surat

      ORDER BY s.created_at DESC;
    `;

    db.query(query, (err, results) => {
      if (err) return callback(err);

      const formatted = results.map((r) => {
        let files = [];

        // SURAT IZIN KEHADIRAN
        if (r.jenis_surat === "Surat Izin Kehadiran") {
          files = [
            r.surat_file,
            r.file_chat_dosen_wali,
            r.file_chat_dosen_pengajar,
            r.file_pendukung,
          ].filter(Boolean);
        }

        // SURAT SURVEI
        else if (r.jenis_surat === "Surat Survey") {
          files = [
            r.surat_file,
          ].filter(Boolean);
        }

        // JENIS SURAT LAIN
        else {
          files = [
            r.ps_file_surat,
            r.surat_file,
          ].filter(Boolean);
        }

        return {
          id_surat: r.id_surat,
          nama: r.nama,
          nim: r.nim,
          jurusan: r.jurusan,
          jenis_surat: r.jenis_surat,
          status: r.status,
          tanggal_pengajuan: r.tanggal_pengajuan,

          keperluan: r.ps_keperluan || r.surat_keperluan || null,
          deskripsi_pengajuan: r.ps_deskripsi || null,

          files,

          detail: {
            nama_orangtua: r.nama_orangtua,
            nohp_orangtua: r.nohp_orangtua,
            kelas_perkuliahan: r.kelas_perkuliahan,
            nama_dosen_wali: r.nama_dosen_wali,
            jenis_perizinan: r.jenis_perizinan,
            tanggal_mulai: r.tanggal_mulai,
            tanggal_selesai: r.tanggal_selesai,
          },
        };
      });

      callback(null, formatted);
    });
  },
};

export default Arsip;
