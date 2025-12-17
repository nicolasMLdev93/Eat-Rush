"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExistantDeleteRest = exports.validateExistantDeleteCat = exports.validateExistantDeleteProd = exports.validateExistantCreateCategory = exports.validateExistantCreateRestaurant = exports.validateExistantCreateProduct = exports.validateExistantUser_register = exports.validateExistantUser_login = void 0;
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
const validateExistantCreateProduct = async (req, res, next) => {
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
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};
exports.validateExistantCreateProduct = validateExistantCreateProduct;
const validateExistantCreateRestaurant = async (req, res, next) => {
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
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};
exports.validateExistantCreateRestaurant = validateExistantCreateRestaurant;
const validateExistantCreateCategory = async (req, res, next) => {
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
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};
exports.validateExistantCreateCategory = validateExistantCreateCategory;
const validateExistantDeleteProd = async (req, res, next) => {
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
        }
        else {
            next();
        }
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};
exports.validateExistantDeleteProd = validateExistantDeleteProd;
const validateExistantDeleteCat = async (req, res, next) => {
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
        }
        else {
            next();
        }
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};
exports.validateExistantDeleteCat = validateExistantDeleteCat;
const validateExistantDeleteRest = async (req, res, next) => {
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
        }
        else {
            next();
        }
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};
exports.validateExistantDeleteRest = validateExistantDeleteRest;
