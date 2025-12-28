import express from "express";
import { pengajuanBeasiswa } from "../controllers/pengajuanBeasiswaController.js";

const router = express.Router();

router.post("/beasiswa", pengajuanBeasiswa);

export default router;
