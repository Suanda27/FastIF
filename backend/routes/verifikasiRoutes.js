import express from "express";
import { verifikasiSurat } from "../controllers/verifikasiController.js";

const router = express.Router();

router.post("/", verifikasiSurat);

export default router;
