import { getStatusSuratByUser, updateSuratById, updatePengajuanSuratBySuratId, updateFormSuratIzinBySuratId } from "../models/statusSuratMhsModel.js";

// ================= AMBIL STATUS SURAT =================
export const statusSuratMhsController = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const id_user = req.session.user.id_user;

  getStatusSuratByUser(id_user, (err, results) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

// ================= UPDATE SURAT MAHASISWA =================
export const updateSuratMhsController = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const id_surat = req.params.id;
  const { keperluan, keterangan } = req.body;
  const file_surat = req.file ? req.file.filename : null;
  const now = new Date();

  // update tabel surat
  const updateData = {
    keperluan,
    keterangan,
    status: "diproses",
    tanggal_pengajuan: now,
  };

  if (file_surat) updateData.file_surat = file_surat;

  updateSuratById(id_surat, updateData, (err, results) => {
    if (err) {
      console.error("DB ERROR surat:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // update pengajuan_surat
    const pengajuanData = {
      keperluan,
      file_surat,
      created_at: now,
    };

    updatePengajuanSuratBySuratId(id_surat, pengajuanData, (err2) => {
      if (err2) {
        console.error("DB ERROR pengajuan:", err2);
        return res.status(500).json({ message: "Database error (pengajuan)" });
      }

      if (file_surat) {
        updateFormSuratIzinBySuratId(id_surat, file_surat, (err3) => {
          if (err3) {
            console.error("DB ERROR form_surat_izin:", err3);
            return res.status(500).json({
              message: "Database error (form_surat_izin)"
            });
          }

          return res.json({
            message: "Surat izin berhasil diupload ulang",
            results
          });
        });
      } else {
        return res.json({
          message: "Surat & pengajuan_surat updated successfully",
          results
        });
      }
    });
  });
};
