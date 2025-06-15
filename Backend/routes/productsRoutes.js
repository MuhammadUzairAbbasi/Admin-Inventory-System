import express from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductbyTitle,
} from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/addProduct", authMiddleware, upload.single("image"), addProduct);
router.get("/", authMiddleware, getAllProducts);
router.get("/:title", authMiddleware, getProductbyTitle);
router.put("/updateProduct/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
