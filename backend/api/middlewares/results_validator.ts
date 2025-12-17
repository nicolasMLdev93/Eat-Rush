const { query, validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

export const validate_Results = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array().map((error: any) => ({
          field: error.param,
          message: error.msg,
          value: error.value,
          location: error.location,
        })),
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    console.error("Validation middleware error:", error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};
