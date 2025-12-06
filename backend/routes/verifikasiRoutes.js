import express from "express";
import {
  verifikasiSurat,
  getDetailSurat,
} from "../controllers/verifikasiController.js";
const router = express.Router();

router.post("/", verifikasiSurat);
router.get("/:id_surat", getDetailSurat);

export default router;
