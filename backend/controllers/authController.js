import db from "../config/db.js";
import bcrypt from "bcrypt";

// === Controller: LOGIN ===
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Isi semua field!" });
  }

  const query = "SELECT * FROM user WHERE email = ? OR nama = ? LIMIT 1";

  db.query(query, [username, username], async (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: "Server error." });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "User tidak ditemukan." });
    }

    const user = results[0];

    // password database belum bcrypt
    const passwordValid = password === user.password;

    if (!passwordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Password salah." });
    }

    req.session.user = {
      id_user: user.id_user,
      nama: user.nama,
      email: user.email,
      role: user.role,
    };

    console.log("✅ Login berhasil untuk:", user.nama);

    res.json({
      success: true,
      message: "Login berhasil",
      user: req.session.user,
    });
  });
};

// === Controller: PROFILE ===
export const getProfile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Belum login" });
  }

  res.json({
    success: true,
    message: "Data profil",
    user: req.session.user,
  });
};

// === Controller: ME ===
export const getMe = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Belum login",
    });
  }

  res.json({
    success: true,
    user: req.session.user,
  });
};

// === Controller: LOGOUT ===
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logout berhasil" });
  });
};
