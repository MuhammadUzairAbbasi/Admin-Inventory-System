import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ProductRoutes from "./routes/productsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", AuthRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/orders", orderRoutes);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
