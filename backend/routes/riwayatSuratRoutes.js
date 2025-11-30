import express from "express";
import { getRiwayat } from "../controllers/riwayatSuratController.js";

const router = express.Router();

// GET riwayat surat berdasarkan id_user
router.get("/:id_user", getRiwayat);

export default router;
