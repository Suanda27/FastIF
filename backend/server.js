// backend/server.js
import express from "express";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import mysql from "mysql2";
import db from "./config/db.js";
import bcrypt from "bcrypt";

dotenv.config();
console.log("SESSION_SECRET =", process.env.SESSION_SECRET);

const app = express();

// ==== Middleware dasar ====
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("tiny"));

// ==== Session setup ====
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fastif-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // ubah ke true kalau pakai https
      maxAge: 1000 * 60 * 30, // 30 menit
    },
  })
);

// ==== Rate limiter untuk login ====
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 5,
  message: "Terlalu banyak percobaan login, coba lagi nanti.",
});

/* // ==== Dummy user data (sementara sebelum LDAP) ====
const fakeUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "mahasiswa", password: "12345", role: "mahasiswa" },
];

// ==== Route login ====
app.post("/api/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;

  const user = fakeUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Username atau password salah" });
  }

  req.session.user = { username: user.username, role: user.role };
  res.json({
    success: true,
    message: "Login berhasil",
    user: req.session.user,
  });
}); */

// ==== Route login (pakai database MySQL) ====
app.post("/api/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Isi semua field!" });
  }

  // Cek user di database (berdasarkan email atau nama)
  const query = "SELECT * FROM user WHERE email = ? OR nama = ? LIMIT 1";

  db.query(query, [username, username], async (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: "Server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "User tidak ditemukan." });
    }

    const user = results[0];

    // 💡 Kalau database belum pakai bcrypt
    let passwordValid = password === user.password;

    // 💡 Kalau nanti ubah jadi bcrypt:
    // const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ success: false, message: "Password salah." });
    }

    // Simpan session user
    req.session.user = {
      id_user: user.id_user,
      nama: user.nama,
      email: user.email,
      role: user.role || "mahasiswa", // sesuaikan dengan kolom tabel
    };

    console.log("✅ Login berhasil untuk:", user.nama);

    res.json({
      success: true,
      message: "Login berhasil",
      user: req.session.user,
    });
  });
});



// ==== Route cek profil (hanya jika login) ====
app.get("/api/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Belum login" });
  }

  res.json({
    success: true,
    message: "Data profil",
    user: req.session.user,
  });
});

// ==== ✅ Route logout (versi lebih kuat) ====
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); // ✅ hapus cookie dari browser
    res.json({ success: true, message: "Logout berhasil" });
  });
});

// ===========================================
// ========== 📂 Upload & Formulir ===========
// ===========================================

// Pastikan folder uploads ada
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(
      /\s+/g,
      "_"
    )}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Biar file bisa diakses langsung via URL
app.use("/uploads", express.static(uploadsDir));

// Dummy data sementara
let formulirData = [
  {
    id: 1,
    title: "Surat Izin Kehadiran",
    fileName: null,
    templateFileName: null,
  },
  { id: 2, title: "Surat Survey", fileName: null, templateFileName: null },
  { id: 3, title: "Surat Pengantar", fileName: null, templateFileName: null },
  { id: 4, title: "Surat Izin Magang", fileName: null, templateFileName: null },
];

// GET semua formulir
app.get("/api/formulir", (req, res) => {
  res.json({ success: true, data: formulirData });
});

// ✅ POST upload file (pakai multer)
app.post("/api/formulir", upload.single("file"), (req, res) => {
  try {
    const { id, isTemplate } = req.body;
    const parsedId = Number(id);
    const templateFlag = isTemplate === "true" || isTemplate === true;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Tidak ada file yang diunggah." });
    }

    const fileName = req.file.filename;

    formulirData = formulirData.map((item) =>
      item.id === parsedId
        ? {
            ...item,
            ...(templateFlag ? { templateFileName: fileName } : { fileName }),
          }
        : item
    );

    console.log("📤 Upload berhasil:", {
      id: parsedId,
      isTemplate: templateFlag,
      fileName,
    });

    res.json({
      success: true,
      message: templateFlag
        ? "File template berhasil diupload!"
        : "File contoh berhasil diupload!",
      data: formulirData,
    });
  } catch (err) {
    console.error("Error POST /api/formulir:", err);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server." });
  }
});

// ✅ DELETE file
app.delete("/api/formulir", express.json(), (req, res) => {
  try {
    const { id, isTemplate } = req.body;
    const parsedId = Number(id);
    const templateFlag = isTemplate === true || isTemplate === "true";

    formulirData = formulirData.map((item) =>
      item.id === parsedId
        ? {
            ...item,
            ...(templateFlag ? { templateFileName: null } : { fileName: null }),
          }
        : item
    );

    console.log("🗑 Hapus file:", { id: parsedId, isTemplate: templateFlag });
    res.json({
      success: true,
      message: "File berhasil dihapus!",
      data: formulirData,
    });
  } catch (err) {
    console.error("Error DELETE /api/formulir:", err);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server." });
  }
});

// admin dsahboard route
app.get("/api/cardadmin", (req, res) => {
  const statsQuery = `
    SELECT
      (SELECT COUNT(*) FROM surat WHERE status = 'diproses') AS pengajuan,
      (SELECT COUNT(*) FROM surat WHERE status = 'ditolak') AS verifikasi,
      (SELECT COUNT(*) FROM surat WHERE status = 'diterima') AS selesai
  `;

  db.query(statsQuery, (err, statsResult) => {
    if (err) {
      console.error("DB Error (stats):", err);
      return res.status(500).json({ success: false, message: "DB Error (stats)" });
    }

    const tableQuery = `
      SELECT 
        s.id_surat,
        u.nama,
        u.nim,
        u.jurusan,
        s.jenis_surat AS jenis,
        s.status
      FROM surat s
      JOIN user u ON s.id_user = u.id_user
      ORDER BY s.created_at DESC
    `;

    db.query(tableQuery, (err, tableResult) => {
      if (err) {
        console.error("DB Error (table):", err);
        return res.status(500).json({ success: false, message: "DB Error (table)" });
      }

      res.json({
        success: true,
        pengajuan: statsResult[0].pengajuan,
        verifikasi: statsResult[0].verifikasi,
        selesai: statsResult[0].selesai,
        dataSurat: tableResult,
      });
    });
  });
});

// === Route verifikasi surat ===
app.post("/api/verifikasi", (req, res) => {
  const { id_surat, status } = req.body;
  
  if (!id_surat || !status) {
    return res.status(400).json({ success: false, message: "Data tidak lengkap." });
  }

  db.query(
    "UPDATE surat SET status = ? WHERE id_surat = ?",
    [status, id_surat],
    (err, result) => {
      if (err) {
        console.error("DB Error (update):", err);
        return res.status(500).json({ success: false, message: "Gagal update status." });
      }

      return res.json({ success: true, message: "Status berhasil diubah." });
    }
  );
});



// === Route testing root ===
app.get("/", (req, res) => {
  res.send("Server FASTIF aktif 🚀");
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () =>
  console.log(`✅ FASTIF Backend running at http://localhost:${PORT}`)
);
