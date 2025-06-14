import Product from "../models/Product.js";
import { productSchema } from "../validations/productValidation.js";
import dotenv from "dotenv";
dotenv.config();

export const addProduct = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, category, price, stock } = req.body;
  const image = req.file?.path || null; // Cloudinary returns a `path` URL

  try {
    const product = new Product({ title, category, price, stock, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error in addProduct:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductbyTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const products = await Product.find({
      title: { $regex: title, $options: "i" },
    });

    res.json(products);
  } catch (error) {
    console.error("Error in getProductbyTitle:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
