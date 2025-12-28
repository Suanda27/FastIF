import express from "express";
import { upload } from "../config/multerConfig.js";
import { pengajuanPengantar } from "../controllers/pengajuanPengantarController.js";

const router = express.Router();

const uploadPengantar = upload.single("file");

router.post("/pengantar", uploadPengantar, pengajuanPengantar);

export default router;
