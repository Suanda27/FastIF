// backend/server.js
import express from "express";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

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
      secure: false, // false karena localhost (kalau https nanti ubah ke true)
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

// ==== Dummy user data (sementara sebelum LDAP) ====
const fakeUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "mahasiswa", password: "12345", role: "mahasiswa" },
];

// ==== Route login (dummy) ====
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
});

// ==== Route cek profil (hanya jika login) ====
app.get("/api/profile", (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ success: false, message: "Belum login" });

  res.json({
    success: true,
    message: "Data profil",
    user: req.session.user,
  });
});

// ==== Route logout ====
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logout berhasil" });
  });
});

// ==== Jalankan server ====
const PORT = process.env.PORT || 8001;
app.get("/", (req, res) => {
  res.send("Server FASTIF aktif 🚀");
});
app.listen(PORT, () =>
  console.log(`✅ FASTIF Backend running at http://localhost:${PORT}`)
);
