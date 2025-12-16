import db from "../config/db.js";

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
