import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { generateToken } from "../config/utils.js";
import { loginSchema } from "../validations/loginValidation.js";

export const Login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, res);

    res.status(200).json({ token, email: user.email });
  } catch (error) {
    console.error("Error in Login Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Admin user created successfully" });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in Logout Controller:", error.message);
    res.status(500).json({ message: "Logout failed" });
  }
};
