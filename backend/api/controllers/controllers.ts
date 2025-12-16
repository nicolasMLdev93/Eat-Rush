const { Product, Restaurant, Category, User } = require("../../models");
import { Request, Response, NextFunction } from "express";
import { body, param, query, ValidationChain } from "express-validator";
const bcrypt = require("bcrypt");

// Get all products from Database //
exports.getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      products: products,
      success: true,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

// Get all restaurants from Database //
exports.getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json({
      restaurants: restaurants,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

// Get all categories from Database //
exports.getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      categories: categories,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

// Register new user on database //
exports.registerUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, surName, email, password, isActive, role } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    await User.create({
      firstName: firstName,
      surName: surName,
      email: email,
      password: hashPassword,
      isActive: isActive,
      role: role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ Success: "New user created!", success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};
