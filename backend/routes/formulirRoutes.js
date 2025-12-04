import express from "express";
import { upload } from "../config/multerConfig.js";
import {
  fetchTemplates,
  uploadTemplateFile,
  deleteTemplateFile,
  createTemplate,
} from "../controllers/formulirController.js";

const router = express.Router();

router.get("/", fetchTemplates);
router.post("/upload", upload.single("file"), uploadTemplateFile);
router.delete("/delete", express.json(), deleteTemplateFile);
router.post("/create", express.json(), createTemplate);

export default router;
