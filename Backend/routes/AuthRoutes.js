import express from "express";
import { Login, registerAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", registerAdmin);

export default router;
