import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalOrders,
      pendingOrders,
      totalProducts,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err.message);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
