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

export const validateAdminToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: any = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if (decoded.role !== "admin") {
      return res.status(403).json({
        error: "Access only for Admin",
        success: false,
      });
    } else {
      next();
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Expired token", success: false });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token", success: false });
    }

    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};
