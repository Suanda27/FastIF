import express from "express";
import { upload } from "../config/multerConfig.js";
import { pengajuanMagang } from "../controllers/pengajuanMagangController.js";

const router = express.Router();

const uploadMagang = upload.single("file");

router.post("/magang", uploadMagang, pengajuanMagang);

export default router;
