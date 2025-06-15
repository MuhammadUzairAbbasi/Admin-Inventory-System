import express from "express";
import { Login, registerAdmin, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", registerAdmin);
router.post("/logout", logout);

export default router;
