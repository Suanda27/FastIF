import {
  updateSuratStatus,
  updateSuratKeterangan,
  getSuratDetailById,
  insertVerifikasiLog,
  getSuratDiproses,
} from "../models/verifikasiModel.js";

// VERIFIKASI SURAT
export const verifikasiSurat = async (req, res) => {
  let { id_surat, status, catatan } = req.body;

  // Pastikan user login dan role admin
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: hanya admin yang dapat memverifikasi",
    });
  }

  // Ambil id admin dari session
  const id_admin = req.session.user.id_user;

  if (!id_surat || !status) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap",
    });
  }

  status = status.toLowerCase();
  const allowed = ["diproses", "diterima", "ditolak"];
  if (!allowed.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status tidak valid",
    });
  }

  try {
    // UPDATE STATUS
    await updateSuratStatus(id_surat, status);

    // UPDATE KETERANGAN SURAT (AMBIL DARI CATATAN ADMIN)
    await updateSuratKeterangan(id_surat, catatan || null);

    // INSERT LOG VERIFIKASI
    await insertVerifikasiLog(id_surat, id_admin, status, catatan || null);

    res.json({
      success: true,
      message: "Status berhasil diubah & log tercatat",
    });
  } catch (err) {
    console.error("Error verifikasi:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengubah status",
    });
  }
};

// DETAIL SURAT
export const getDetailSurat = async (req, res) => {
  try {
    const { id_surat } = req.params;

    const data = await getSuratDetailById(id_surat);

    if (!data) {
      return res.json({
        success: false,
        message: "Surat tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Detail Error:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail surat",
    });
  }
};

// LIST SURAT DIPROSES
export const getSuratUntukVerifikasi = async (req, res) => {
  try {
    const [data] = await getSuratDiproses();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Error Fetch:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data verifikasi",
    });
  }
};
