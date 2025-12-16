import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/user/profile", getProfile);
router.put("/user/profile", updateProfile);

export default router;
