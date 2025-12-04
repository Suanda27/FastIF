import db from "../config/db.js";

// Ambil semua template
export const getAllTemplates = () => {
  const sql = "SELECT * FROM template_surat ORDER BY id_template ASC";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

// Ambil template berdasarkan ID
export const getTemplateById = (id) => {
  const sql = "SELECT * FROM template_surat WHERE id_template = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, rows) => {
      if (err) return reject(err);
      if (rows.length === 0) return resolve(null);
      resolve(rows[0]);
    });
  });
};

// Insert/update file template
export const upsertTemplateFile = (id, namaTemplate, field, filename) => {
  const sql = `
    INSERT INTO template_surat (id_template, nama_template, ${field})
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      nama_template = VALUES(nama_template),
      ${field} = VALUES(${field})
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [id, namaTemplate, filename], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

// Ambil nama file template/ contoh
export const getTemplateFile = (id, field) => {
  const sql = `SELECT ${field} FROM template_surat WHERE id_template = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, rows) => {
      if (err) return reject(err);
      if (rows.length === 0) return resolve(null);
      resolve(rows[0][field]);
    });
  });
};

// Hapus field file
export const deleteTemplateFileField = (id, field) => {
  const sql = `
    UPDATE template_surat
    SET ${field} = NULL
    WHERE id_template = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

// Buat template baru
export const createTemplateModel = (nama_template) => {
  const sql = `
    INSERT INTO template_surat (nama_template)
    VALUES (?)
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [nama_template], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};
