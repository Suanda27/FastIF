import { getStatusSuratByUser, updateSuratById } from "../models/statusSuratMhsModel.js";

// Ambil status surat user
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

// Update surat mahasiswa
export const updateSuratMhsController = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const id_surat = req.params.id;
  const { keperluan, keterangan } = req.body;
  const file_surat = req.file ? req.file.filename : null;

  // Menambahkan status "diproses" saat update
  const updateData = { 
    keperluan, 
    keterangan, 
    status: "diproses" 
  };
  if (file_surat) updateData.file_surat = file_surat;

  updateSuratById(id_surat, updateData, (err, results) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Surat updated successfully", results });
  });
};
