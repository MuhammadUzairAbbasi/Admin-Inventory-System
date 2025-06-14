import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllOrders);
router.post("/createOrder", authMiddleware, createOrder);
router.put("/:id/status", authMiddleware, updateOrderStatus);

export default router;
