import express from "express";
import { upload } from "../config/multerConfig.js";
import { statusSuratMhsController, updateSuratMhsController } from "../controllers/statusSuratMhsController.js";

const router = express.Router();

router.get("/", statusSuratMhsController);

// Endpoint update surat dengan upload file
router.put("/:id", upload.single("file_surat"), updateSuratMhsController);

export default router;
