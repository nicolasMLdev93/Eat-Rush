import { Request, Response, NextFunction } from "express";
import { body, param, query, ValidationChain } from "express-validator";
const { Product, Restaurant, Category, User } = require("../../models");
const jwt = require("jsonwebtoken");

export const validateExistantUser_login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const result = await User.findOne({ where: { email: email } });
    if (!result) {
      res.status(400).json({
        error: `Invalid credentials`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

export const validateExistantUser_register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const result = await User.findOne({ where: { email: email } });
    if (result) {
      res.status(400).json({
        error: `A user with the email ${email} already exists.`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

export const validateExistantCreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId, restaurantId } = req.body;
  try {
    const category = await Category.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      res.status(404).json({
        error: "Category not found",
        success: false,
      });
      return;
    }
    const restaurant = await Restaurant.findOne({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      res.status(404).json({
        error: "Restaurant not found",
        success: false,
      });
      return;
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantCreateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const restaurant = await Restaurant.findOne({
      where: { name: name },
    });
    if (restaurant) {
      res.status(404).json({
        error: "A restaurant with that name already exists!",
        success: false,
      });
      return;
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantCreateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const category = await Category.findOne({
      where: { name: name },
    });
    if (category) {
      res.status(404).json({
        error: "A category with that name already exists!",
        success: false,
      });
      return;
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantDeleteProd = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const product = await Product.findOne({
      where: { id: id },
    });
    if (!product) {
      res.status(404).json({
        error: "A product with that id not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantDeleteCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const category = await Category.findOne({
      where: { id: id },
    });
    if (!category) {
      res.status(404).json({
        error: "A category with that id not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantDeleteRest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const restaurant = await Restaurant.findOne({
      where: { id: id },
    });
    if (!restaurant) {
      res.status(404).json({
        error: "A restaurant with that id not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};
