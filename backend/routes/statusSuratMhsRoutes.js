import express from "express";
import { statusSuratMhsController } from "../controllers/statusSuratMhsController.js";

const router = express.Router();

router.get("/", statusSuratMhsController);

export default router;
