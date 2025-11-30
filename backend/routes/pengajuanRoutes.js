import express from "express";
import { upload } from "../config/multerConfig.js";
import { pengajuanIzinKehadiran } from "../controllers/pengajuanController.js";

const router = express.Router();

const multiUpload = upload.fields([
  { name: "suratFile", maxCount: 1 },
  { name: "buktiDosenWali", maxCount: 1 },
  { name: "buktiDosenPengajar", maxCount: 1 },
  { name: "buktiPendukung", maxCount: 1 },
]);

// POST pengajuan surat izin kehadiran
router.post("/izin-kehadiran", multiUpload, pengajuanIzinKehadiran);

export default router;
