import db from "../config/db.js";
import bcrypt from "bcrypt";

// ================= REGISTER =================
export const register = (req, res) => {
  const { nama, email, password, nim, prodi } = req.body;

  if (!nama || !email || !password || !nim || !prodi) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  // validasi prodi static
  const ALLOWED_PRODI = [
  "Teknik Informatika",
  "Teknologi Geomatika",
  "Terapan Animasi",
  "Terapan Teknologi Rekayasa Multimedia",
  "Terapan Rekayasa Keamanan Siber",
  "Terapan Rekayasa Perangkat Lunak",
  "Teknik Komputer",
  "Terapan Teknologi Permainan",
  ];

  if (!ALLOWED_PRODI.includes(prodi)) {
    return res.status(400).json({ message: "Prodi tidak valid" });
  }

  db.query(
    "SELECT id_user FROM user WHERE email = ? OR nim = ?",
    [email, nim],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length > 0) {
        return res
          .status(409)
          .json({ message: "Email atau NIM sudah terdaftar" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        `INSERT INTO user 
         (nama, email, password, nim, role, jurusan, prodi)
         VALUES (?, ?, ?, ?, 'mahasiswa', 'Teknik Informatika', ?)`,
        [nama, email, hashedPassword, nim, prodi],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gagal menyimpan user" });
          }

          res.status(201).json({
            success: true,
            message: "Registrasi berhasil",
            jurusan: "Teknik Informatika",
            prodi,
          });
        }
      );
    }
  );
};

// ================= LOGIN =================
export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Isi semua field!",
    });
  }

  db.query(
    "SELECT * FROM user WHERE email = ? OR nama = ? LIMIT 1",
    [username, username],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ success: false, message: "User tidak ditemukan" });
      }

      const user = results[0];
      let passwordValid = false;

      // bcrypt atau plain
      if (user.password.startsWith("$2b$")) {
        passwordValid = await bcrypt.compare(password, user.password);
      } else {
        passwordValid = password === user.password;

        // auto upgrade ke bcrypt
        if (passwordValid) {
          const hashed = await bcrypt.hash(password, 10);
          db.query("UPDATE user SET password = ? WHERE id_user = ?", [
            hashed,
            user.id_user,
          ]);
        }
      }

      if (!passwordValid) {
        return res
          .status(401)
          .json({ success: false, message: "Password salah" });
      }

      req.session.user = {
        id_user: user.id_user,
        nama: user.nama,
        email: user.email,
        role: user.role,
      };

      res.json({
        success: true,
        message: "Login berhasil",
        user: req.session.user,
      });
    }
  );
};

// ================= PROFILE =================
export const getProfile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Belum login" });
  }

  res.json({
    success: true,
    user: req.session.user,
  });
};

// ================= ME =================
export const getMe = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Belum login" });
  }

  res.json({
    success: true,
    user: req.session.user,
  });
};

// ================= LOGOUT =================
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logout berhasil" });
  });
};
