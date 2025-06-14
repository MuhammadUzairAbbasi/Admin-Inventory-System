import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    // Optional: Validate product IDs and quantity
    for (let item of items) {
      const exists = await Product.findById(item.productId);
      if (!exists) {
        return res
          .status(400)
          .json({ message: `Product not found: ${item.productId}` });
      }
    }

    const newOrder = new Order({ items });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error in createOrder:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("items.productId", "title category price image");

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const statusFlow = ["Pending", "Shipped", "Delivered"];
    const currentIndex = statusFlow.indexOf(order.status);

    if (currentIndex === -1 || currentIndex === statusFlow.length - 1) {
      return res.status(400).json({ message: "Cannot update status further" });
    }

    order.status = statusFlow[currentIndex + 1];
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Error updating order status:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
