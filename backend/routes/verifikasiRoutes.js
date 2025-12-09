import express from "express";
import {
  verifikasiSurat,
  getDetailSurat,
   getSuratUntukVerifikasi,
} from "../controllers/verifikasiController.js";
const router = express.Router();

router.get("/", getSuratUntukVerifikasi);
router.post("/", verifikasiSurat);
router.get("/:id_surat", getDetailSurat);

export default router;
