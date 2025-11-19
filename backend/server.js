import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { sessionConfig } from "./middlewares/sessionConfig.js";
import authRoutes from "./routes/authRoutes.js";
import formulirRoutes from "./routes/formulirRoutes.js";
import statusSuratMhsRoutes from "./routes/statusSuratMhsRoutes.js";
import userDashboardRoutes from "./routes/userDashboardRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import verifikasiRoutes from "./routes/verifikasiRoutes.js";
import arsipRoutes from "./routes/arsipRoutes.js";
import riwayatSuratRoutes from "./routes/riwayatSuratRoutes.js";

import uploadsDir from "./config/multerConfig.js";

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(sessionConfig);

// Static folder uploads
app.use("/uploads", express.static(uploadsDir));

// === Routes ===
app.use("/api", authRoutes);
app.use("/api/formulir", formulirRoutes);
app.use("/api/cardadmin", dashboardRoutes);
app.use("/api/verifikasi", verifikasiRoutes);
app.use("/api/arsip-surat", arsipRoutes);
app.use("/api/user/dashboard", userDashboardRoutes);
app.use("/api/user/status-surat", statusSuratMhsRoutes);
app.use("/api/user/riwayat-surat", riwayatSuratRoutes);

app.get("/", (req, res) => {
  res.send("Server FASTIF aktif 🚀");
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () =>
  console.log(`✅ FASTIF Backend running at http://localhost:${PORT}`)
);
