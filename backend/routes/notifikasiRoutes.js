import express from "express";
import { getNotifikasiMahasiswa } from "../models/notifikasiModel.js";

const router = express.Router();

router.get("/:id_user", async (req, res) => {
  const { id_user } = req.params;

  const [rows] = await getNotifikasiMahasiswa(id_user);

  const data = rows.map((r) => ({
    id: r.id,
    message:
      r.status_verifikasi === "diterima"
        ? `Surat ${r.jenis_surat} telah diterima`
        : r.status_verifikasi === "ditolak"
        ? `Surat ${r.jenis_surat} ditolak`
        : `Surat ${r.jenis_surat} sedang diproses`,
    type:
      r.status_verifikasi === "diterima"
        ? "success"
        : r.status_verifikasi === "ditolak"
        ? "error"
        : "info",
    time: r.tanggal_verifikasi,
  }));

  res.json({
    success: true,
    data,
  });
});

export default router;
