import express from "express";
import { getArsipSurat } from "../controllers/arsipController.js";

const router = express.Router();

router.get("/", getArsipSurat);

export default router;
