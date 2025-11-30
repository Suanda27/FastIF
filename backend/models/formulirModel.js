import db from "../config/db.js";

export const getAllTemplates = () => {
  const sql = "SELECT * FROM template_surat ORDER BY id_template ASC";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const upsertTemplateFile = (id, namaTemplate, field, filename) => {
  const sql = `
    INSERT INTO template_surat (id_template, nama_template, ${field})
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE ${field} = VALUES(${field})
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [id, namaTemplate, filename], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

export const getTemplateFile = (id, field) => {
  const sql = `SELECT ${field} FROM template_surat WHERE id_template = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, rows) => {
      if (err || rows.length === 0) return reject(err);
      resolve(rows[0][field]);
    });
  });
};

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
