import express from "express";
import {
  statsController,
  aktivitasController,
  templateController,
} from "../controllers/dashboardmhsController.js";

const router = express.Router();

router.get("/stats/:id_user", statsController);
router.get("/aktivitas/:id_user", aktivitasController);
router.get("/templates", templateController);

export default router;
