import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

router.get("/:file", (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join("uploads", fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("<h1>File tidak ditemukan</h1>");
  }

  const ext = path.extname(fileName).toLowerCase();

  // IMAGE PREVIEW
  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    return res.send(`
      <html>
      <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:#f0f0f0;">
        <img src="/uploads/${fileName}" style="max-width:100%; max-height:100vh;" />
      </body>
      </html>
    `);
  }

  // PDF PREVIEW
  if (ext === ".pdf") {
    return res.send(`
      <html>
      <body style="margin:0;padding:0;">
        <embed src="/uploads/${fileName}" type="application/pdf" width="100%" height="100%" />
      </body>
      </html>
    `);
  }

  // WORD PREVIEW (DOC / DOCX)
  if ([".doc", ".docx"].includes(ext)) {
    const fileUrl = `http://localhost:8001/uploads/${fileName}`;
    return res.send(`
      <html>
      <body style="margin:0;padding:0;">
        <iframe 
          src="https://docs.google.com/gview?url=${fileUrl}&embedded=true" 
          style="width:100%; height:100%; border:none;">
        </iframe>
      </body>
      </html>
    `);
  }

  res.send("<h3>File type tidak didukung untuk preview</h3>");
});

export default router;
