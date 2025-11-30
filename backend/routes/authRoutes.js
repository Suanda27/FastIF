import express from "express";
import { loginLimiter } from "../middlewares/loginLimiter.js";

import {
  login,
  getProfile,
  getMe,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.get("/profile", getProfile);
router.get("/me", getMe);
router.post("/logout", logout);

export default router;
