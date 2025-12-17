const { Product, Restaurant, Category, User } = require("../../models");
import { Request, Response, NextFunction } from "express";
import { body, param, query, ValidationChain } from "express-validator";
import { permission } from "node:process";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Login user //
exports.loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ where: { email: email } });
    const match = await bcrypt.compare(password, result.password);
    if (match) {
      const token = jwt.sign(
        {
          token: result.id,
          email: result.email,
          role: result.role,
        },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: `Welcome user ${email}`,
        token: token,
        success: true,
      });
    } else {
      res
        .status(400)
        .json({ error: "Invalid password! Try again!", success: false });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

// Register new product //
exports.createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, isAvailable, categoryId, restaurantId } =
    req.body;
  try {
    await Product.create({
      name: name,
      description: description,
      price: price,
      isAvailable: isAvailable,
      categoryId: categoryId,
      restaurantId: restaurantId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({
      success: true,
      message: "New product created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

// Register new Restaurant //
exports.createRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, address, phone, isActive } = req.body;
  try {
    await Restaurant.create({
      name: name,
      description: description,
      address: address,
      phone: phone,
      isActive: isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({
      success: true,
      message: "New restaurant created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};


// Register new Restaurant //
exports.createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, isActive } = req.body;
  try {
    await Category.create({
      name: name,
      isActive: isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({
      success: true,
      message: "New category created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};
