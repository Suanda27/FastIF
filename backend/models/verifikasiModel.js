import db from "../config/db.js";

export const updateSuratStatus = (id_surat, status) => {
  const sql = "UPDATE surat SET status = ? WHERE id_surat = ?";

  return new Promise((resolve, reject) => {
    db.query(sql, [status, id_surat], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
