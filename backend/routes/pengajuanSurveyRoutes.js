import express from "express";
import { upload } from "../config/multerConfig.js";
import { pengajuanSurvey } from "../controllers/pengajuanSurveyController.js";

const router = express.Router();

// Upload 1 file saja
const uploadSurvey = upload.single("file");

// POST pengajuan survey
router.post("/survey", uploadSurvey, pengajuanSurvey);

export default router;
