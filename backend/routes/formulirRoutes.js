import express from "express";
import { upload } from "../config/multerConfig.js";
import {
  fetchTemplates,
  uploadTemplateFile,
  deleteTemplateFile,
} from "../controllers/formulirController.js";

const router = express.Router();

router.get("/", fetchTemplates);
router.post("/upload", upload.single("file"), uploadTemplateFile);
router.delete("/delete", express.json(), deleteTemplateFile);

export default router;
