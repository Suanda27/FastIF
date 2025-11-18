import express from "express";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import { loginLimiter } from "../middlewares/loginLimiter.js";

const router = express.Router();

// === Route login (pakai database MySQL) ===
router.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Isi semua field!" });
  }

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

    // password database belum bcrypt
    let passwordValid = password === user.password;

    if (!passwordValid) {
      return res.status(401).json({ success: false, message: "Password salah." });
    }

    req.session.user = {
      id_user: user.id_user,
      nama: user.nama,
      email: user.email,
      role: user.role || "mahasiswa",
    };

    console.log("✅ Login berhasil untuk:", user.nama);

    res.json({
      success: true,
      message: "Login berhasil",
      user: req.session.user,
    });
  });
});

// === Route cek profil ===
router.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Belum login" });
  }

  res.json({
    success: true,
    message: "Data profil",
    user: req.session.user,
  });
});

// === Route cek user yang sedang login ===
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Belum login"
    });
  }

  res.json({
    success: true,
    user: req.session.user
  });
});

// === Route logout ===
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logout berhasil" });
  });
});

export default router;
