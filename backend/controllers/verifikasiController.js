import {
  updateSuratStatus,
  getSuratDetailById,
} from "../models/verifikasiModel.js";

// Verifikasi Surat
export const verifikasiSurat = async (req, res) => {
  let { id_surat, status } = req.body;

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
    await updateSuratStatus(id_surat, status);

    res.json({
      success: true,
      message: "Status berhasil diubah",
    });
  } catch (err) {
    console.error("Error verifikasi:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengubah status",
    });
  }
};

// DETAIL SURAT (UNTUK MODAL DETAIL)
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

import { getSuratDiproses } from "../models/verifikasiModel.js";

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
