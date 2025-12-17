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

export const validateAdminToken_createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId, restaurantId } = req.body;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        error: "No token provided",
        success: false,
      });
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      return res.status(401).json({
        error: "Token error",
        success: false,
      });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        error: "Token malformed",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if (decoded.role !== "admin") {
      return res.status(403).json({
        error: "Access only for Admin",
        success: false,
      });
    }
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
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Expired token",
        success: false,
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid token",
        success: false,
      });
    }
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateAdminToken_createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        error: "No token provided",
        success: false,
      });
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      return res.status(401).json({
        error: "Token error",
        success: false,
      });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        error: "Token malformed",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if (decoded.role !== "admin") {
      return res.status(403).json({
        error: "Access only for Admin",
        success: false,
      });
    }
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
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Expired token",
        success: false,
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid token",
        success: false,
      });
    }
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};


export const validateAdminToken_createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {name } = req.body;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        error: "No token provided",
        success: false,
      });
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      return res.status(401).json({
        error: "Token error",
        success: false,
      });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        error: "Token malformed",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if (decoded.role !== "admin") {
      return res.status(403).json({
        error: "Access only for Admin",
        success: false,
      });
    }
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
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Expired token",
        success: false,
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid token",
        success: false,
      });
    }
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};