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

  // cek admin
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const id_admin = req.session.user.id_user;

  if (!id_surat || !status) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap",
    });
  }

  status = status.toLowerCase();

  // ✅ STATUS BARU YANG VALID
  const allowed = ["diterima", "ditolak", "ditangguhkan", ];
  if (!allowed.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status verifikasi tidak valid",
    });
  }

  try {
    // log verifikasi
    await insertVerifikasiLog(
      id_surat,
      id_admin,
      status,
      catatan || null
    );

    // update status surat
    await updateSuratStatus(id_surat, status);

    // update keterangan (opsional)
    if (catatan) {
      await updateSuratKeterangan(id_surat, catatan);
    }

    res.json({
      success: true,
      message: "Verifikasi surat berhasil",
      status,
    });
  } catch (err) {
    console.error("Error verifikasi:", err);
    res.status(500).json({
      success: false,
      message: "Gagal memverifikasi surat",
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
