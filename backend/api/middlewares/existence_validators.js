"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExistantUser_register = exports.validateExistantUser_login = void 0;
const { Product, Restaurant, Category, User } = require("../../models");
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
