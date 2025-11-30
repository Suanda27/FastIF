import express from "express";
import { upload } from "../config/multerConfig.js";
import { pengajuanSurvei } from "../controllers/pengajuanSurveiController.js";

const router = express.Router();

// Upload 1 file saja
const uploadSurvei = upload.single("file");

// POST pengajuan survei
router.post("/survei", uploadSurvei, pengajuanSurvei);

export default router;
