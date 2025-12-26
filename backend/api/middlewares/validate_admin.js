"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserToken = exports.validateAdminToken = void 0;
const jwt = require("jsonwebtoken");
const validateAdminToken = async (req, res, next) => {
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
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                error: "Server configuration error",
                success: false,
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (decoded.role !== "admin") {
            return res.status(403).json({
                error: "Access only for Admin",
                success: false,
            });
        }
        next();
    }
    catch (error) {
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
exports.validateAdminToken = validateAdminToken;
const validateUserToken = async (req, res, next) => {
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
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                error: "Server configuration error",
                success: false,
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (decoded.role !== "user") {
            return res.status(403).json({
                error: "Access only for users",
                success: false,
            });
        }
        next();
    }
    catch (error) {
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
exports.validateUserToken = validateUserToken;
