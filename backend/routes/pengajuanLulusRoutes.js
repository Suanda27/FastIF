import express from "express";
import { pengajuanLulus } from "../controllers/pengajuanLulusController.js";

const router = express.Router();

router.post("/lulus", pengajuanLulus);

export default router;
