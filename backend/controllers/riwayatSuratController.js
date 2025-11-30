import { getRiwayatByUserId } from "../models/riwayatSuratModel.js";

export const getRiwayat = async (req, res) => {
  const { id_user } = req.params;

  try {
    const data = await getRiwayatByUserId(id_user);

    // Tambahkan pesan jika data kosong
    const message =
      data.length === 0 ? "Belum ada riwayat surat" : "Riwayat surat ditemukan";

    res.json({ success: true, data, message });
  } catch (err) {
    console.error("Error get riwayat:", err);
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil data riwayat" });
  }
};
