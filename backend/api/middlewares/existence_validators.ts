import { Request, Response,NextFunction } from "express";
import { body, param, query, ValidationChain } from "express-validator";
const { Product, Restaurant, Category, User } = require("../../models");

export const validateExistantUser_login = async (
  req: Request,
  res: Response,
  next:NextFunction
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
  next:NextFunction
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
