const { Product, Restaurant, Category } = require("../../models");
import { Request, Response, NextFunction } from "express";

// Get all products from Database //
exports.getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      products: products,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Error getting all products!" });
  }
};

// Get all restaurants from Database //
exports.getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json({
      restaurants: restaurants,
    });
  } catch (error) {
    console.error("Error getting all restaurants:", error);
    res.status(500).json({ error: "Error getting all restaurants!" });
  }
};

// Get all categories from Database //
exports.getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      categories: categories,
    });
  } catch (error) {
    console.error("Error getting all categories:", error);
    res.status(500).json({ error: "Error getting all categories!" });
  }
};
