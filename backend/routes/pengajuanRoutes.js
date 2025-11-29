import express from "express";
import db from "../config/db.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

const multiUpload = upload.fields([
  { name: "suratFile", maxCount: 1 },
  { name: "buktiDosenWali", maxCount: 1 },
  { name: "buktiDosenPengajar", maxCount: 1 },
  { name: "buktiPendukung", maxCount: 1 },
]);

router.post("/izin-kehadiran", multiUpload, async (req, res) => {

  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Belum login"
    });
  }

  const id_user = req.session.user.id_user;

  const {
    namaOrangTua,
    kelasPerkuliahan,
    jenisPerizinan,
    tanggalMulai,
    tanggalTerakhir,
  } = req.body;

  try {
    // Insert ke tabel surat
    const insertSurat = `
      INSERT INTO surat (id_user, id_template, jenis_surat, tanggal_pengajuan, status)
      VALUES (?, 1, 'Surat Izin Kehadiran', NOW(), 'Menunggu Verifikasi')
    `;

    const [suratResult] = await db.promise().query(insertSurat, [id_user]);
    const id_surat = suratResult.insertId;

    // Ambil file upload
    const file_surat = req.files["suratFile"]?.[0]?.filename || null;
    const file_wali = req.files["buktiDosenWali"]?.[0]?.filename || null;
    const file_pengajar = req.files["buktiDosenPengajar"]?.[0]?.filename || null;
    const file_pendukung = req.files["buktiPendukung"]?.[0]?.filename || null;

    // Insert ke tabel form_surat_izin
    const insertForm = `
      INSERT INTO form_surat_izin
      (id_surat, nama_nohp_orangtua, kelas_perkuliahan, jenis_perizinan, 
       tanggal_mulai, tanggal_selesai, file_chat_dosen_wali,
       file_chat_dosen_pengajar, file_pendukung, file_surat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.promise().query(insertForm, [
      id_surat,
      namaOrangTua,
      kelasPerkuliahan,
      jenisPerizinan,
      tanggalMulai,
      tanggalTerakhir,
      file_wali,
      file_pengajar,
      file_pendukung,
      file_surat,
    ]);

    res.json({
      success: true,
      message: "Pengajuan surat izin kehadiran berhasil dikirim",
      id_surat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
});

export default router;
