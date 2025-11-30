import { updateSuratStatus } from "../models/verifikasiModel.js";

export const verifikasiSurat = async (req, res) => {
  let { id_surat, status } = req.body;

  if (!id_surat || !status) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap",
    });
  }

  status = status.toLowerCase();
  const allowedStatus = ["diproses", "diterima", "ditolak"];

  if (!allowedStatus.includes(status)) {
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
    res.status(500).json({
      success: false,
      message: "Gagal mengubah status",
    });
  }
};
