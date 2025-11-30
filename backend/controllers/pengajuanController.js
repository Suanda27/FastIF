import { insertSurat, insertFormSuratIzin } from "../models/pengajuanModel.js";

export const pengajuanIzinKehadiran = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Belum login",
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
    const [suratResult] = await insertSurat(id_user);
    const id_surat = suratResult.insertId;

    // Ambil file upload
    const file_surat = req.files["suratFile"]?.[0]?.filename || null;
    const file_wali = req.files["buktiDosenWali"]?.[0]?.filename || null;
    const file_pengajar =
      req.files["buktiDosenPengajar"]?.[0]?.filename || null;
    const file_pendukung = req.files["buktiPendukung"]?.[0]?.filename || null;

    // Insert ke tabel form_surat_izin
    await insertFormSuratIzin({
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
    });

    res.json({
      success: true,
      message: "Pengajuan surat izin kehadiran berhasil dikirim",
      id_surat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};
