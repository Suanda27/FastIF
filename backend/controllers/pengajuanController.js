import {
  insertSuratIzin,
  insertFormSuratIzin,
  updateSuratFile,
  updateSuratKeperluan
} from "../models/pengajuanModel.js";

export const pengajuanIzinKehadiran = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Belum login" });
  }

  const id_user = req.session.user.id_user;

  const {
    namaOrangTua,
    noHpOrangTua,
    kelasPerkuliahan,
    namaDosenWali,
    jenisPerizinan,
    tanggalMulai,
    tanggalTerakhir,
  } = req.body;

  try {
    // 1. Insert surat
    const [suratResult] = await insertSuratIzin(id_user);
    const id_surat = suratResult.insertId;

    // 2. File upload
    const file_surat = req.files["suratFile"]?.[0]?.filename || null;
    const file_wali = req.files["buktiDosenWali"]?.[0]?.filename || null;
    const file_pengajar = req.files["buktiDosenPengajar"]?.[0]?.filename || null;
    const file_pendukung = req.files["buktiPendukung"]?.[0]?.filename || null;

    // 3. Insert ke form_surat_izin
    await insertFormSuratIzin({
      id_surat,
      namaOrangTua,
      noHpOrangTua,
      kelasPerkuliahan,
      namaDosenWali,
      jenisPerizinan,
      tanggalMulai,
      tanggalTerakhir,
      file_wali,
      file_pengajar,
      file_pendukung,
      file_surat,
    });

    // 4. UPDATE file_surat di tabel surat
    if (file_surat) {
      await updateSuratFile(id_surat, file_surat);
    }

    // 5. UPDATE kolom 'keperluan' dari jenisPerizinan
    await updateSuratKeperluan(id_surat, jenisPerizinan);

    res.json({
      success: true,
      message: "Pengajuan surat izin kehadiran berhasil dikirim",
      id_surat,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
