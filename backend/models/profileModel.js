import db from "../config/db.js";

/* ===============================
   GET PROFILE
================================ */
export const getProfileByUserId = (id_user) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        id_user,
        nama,
        nim,
        email,
        jurusan
      FROM user
      WHERE id_user = ?
        AND role = 'mahasiswa'
    `;

    db.query(query, [id_user], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

/* ===============================
   UPDATE PROFILE (TANPA NIM) 🔒
================================ */
export const updateProfileByUserId = (id_user, data) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE user
      SET
        nama = ?,
        email = ?,
        jurusan = ?
      WHERE id_user = ?
        AND role = 'mahasiswa'
    `;

    const values = [
      data.nama,
      data.email,
      data.jurusan,
      id_user,
    ];

    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
