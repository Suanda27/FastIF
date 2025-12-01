import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { sessionConfig } from "./middlewares/sessionConfig.js";

// ===== Routes Import =====
import authRoutes from "./routes/authRoutes.js";
import formulirRoutes from "./routes/formulirRoutes.js";
import statusSuratMhsRoutes from "./routes/statusSuratMhsRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import verifikasiRoutes from "./routes/verifikasiRoutes.js";
import arsipRoutes from "./routes/arsipRoutes.js";
import riwayatSuratRoutes from "./routes/riwayatSuratRoutes.js";
import pengajuanRoutes from "./routes/pengajuanRoutes.js";
import pengajuanSurveyRoutes from "./routes/pengajuanSurveyRoutes.js";

import dashboardmhsRoutes from "./routes/dashboardmhsRoutes.js";

import { uploadsDir } from "./config/multerConfig.js";

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(sessionConfig);

// ===== Static Files =====
app.use("/uploads", express.static(uploadsDir));

// ===== Routes =====

// --- Auth ---
app.use("/api", authRoutes);

// --- Formulir / Pengajuan ---
app.use("/api/formulir", formulirRoutes);
app.use("/api/user/pengajuan-surat", pengajuanRoutes);
app.use("/api/user/pengajuan-survei", pengajuanSurveyRoutes);

// --- Mahasiswa ---
app.use("/api/user/status-surat", statusSuratMhsRoutes);
app.use("/api/user/riwayat-surat", riwayatSuratRoutes);
app.use("/api/dashboard-mhs", dashboardmhsRoutes);

// --- Admin ---
app.use("/api/cardadmin", dashboardRoutes);
app.use("/api/verifikasi", verifikasiRoutes);
app.use("/api/arsip-surat", arsipRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Server FASTIF aktif 🚀");
});

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`,
  });
});

// ===== Server Start =====
const PORT = process.env.PORT || 8001;

app.listen(PORT, () =>
  console.log(`✅ FASTIF Backend running at http://localhost:${PORT}`)
);
