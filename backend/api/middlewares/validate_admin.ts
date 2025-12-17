import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

export const validateAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
