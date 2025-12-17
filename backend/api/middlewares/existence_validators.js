"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminToken = exports.validateExistantUser_register = exports.validateExistantUser_login = void 0;
const { Product, Restaurant, Category, User } = require("../../models");
const jwt = require("jsonwebtoken");
const validateExistantUser_login = async (req, res, next) => {
    const { email } = req.body;
    try {
        const result = await User.findOne({ where: { email: email } });
        if (!result) {
            res.status(400).json({
                error: `Invalid credentials`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.validateExistantUser_login = validateExistantUser_login;
const validateExistantUser_register = async (req, res, next) => {
    const { email } = req.body;
    try {
        const result = await User.findOne({ where: { email: email } });
        if (result) {
            res.status(400).json({
                error: `A user with the email ${email} already exists.`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.validateExistantUser_register = validateExistantUser_register;
const validateAdminToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        if (decoded.role !== "admin") {
            return res.status(403).json({
                error: "Access only for Admin",
                success: false,
            });
        }
        else {
            next();
        }
    }
    catch (error) {
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
exports.validateAdminToken = validateAdminToken;
