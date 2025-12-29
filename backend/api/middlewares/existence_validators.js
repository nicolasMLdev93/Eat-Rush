"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExistantRes_bySearchName = exports.validateExistantCat_byName = exports.validateExistanCat_byId = exports.validateExistantRes_byName = exports.validateExistanRest_byId = exports.validateExistanProd_byRest = exports.validateExistanProd_byCat = exports.validateExistanProd_byId = exports.validateExistantDeleteRest = exports.validateExistantDeleteCat = exports.validateExistantDeleteProd = exports.validateExistantCreateCategory = exports.validateExistantCreateRestaurant = exports.validateExistantCreateProduct = exports.validateExistantUser_register = exports.validateExistantUser_login = void 0;
const { Product, Restaurant, Category, User } = require("../../models");
const sequelize_1 = require("sequelize");
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
const validateExistanProd_byId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({
            where: { id: id, isAvailable: true },
        });
        if (!product || product.isAvailable == false) {
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
exports.validateExistanProd_byId = validateExistanProd_byId;
const validateExistanProd_byCat = async (req, res, next) => {
    const { categoryId } = req.params;
    try {
        const product = await Product.findOne({
            where: { categoryId: categoryId, isAvailable: true },
        });
        if (!product || product.isAvailable == false) {
            res.status(404).json({
                error: "A product with that categoryId not exists!",
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
exports.validateExistanProd_byCat = validateExistanProd_byCat;
const validateExistanProd_byRest = async (req, res, next) => {
    const { restaurantId } = req.params;
    try {
        const product = await Product.findOne({
            where: { restaurantId: restaurantId, isAvailable: true },
        });
        if (!product || product.isAvailable == false) {
            res.status(404).json({
                error: "A product with that restaurantId not exists!",
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
exports.validateExistanProd_byRest = validateExistanProd_byRest;
const validateExistanRest_byId = async (req, res, next) => {
    const { id } = req.params;
    try {
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
exports.validateExistanRest_byId = validateExistanRest_byId;
const validateExistantRes_byName = async (req, res, next) => {
    const { nameSlug } = req.params;
    try {
        const restaurant = await Restaurant.findOne({
            where: { name: nameSlug },
        });
        if (!restaurant) {
            res.status(404).json({
                error: "A restaurant with that name not exists!",
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
exports.validateExistantRes_byName = validateExistantRes_byName;
const validateExistanCat_byId = async (req, res, next) => {
    const { id } = req.params;
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
exports.validateExistanCat_byId = validateExistanCat_byId;
const validateExistantCat_byName = async (req, res, next) => {
    const { nameSlug } = req.params;
    try {
        const category = await Category.findOne({
            where: { name: nameSlug },
        });
        if (!category) {
            res.status(404).json({
                error: "A category with that name not exists!",
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
exports.validateExistantCat_byName = validateExistantCat_byName;
const validateExistantRes_bySearchName = async (req, res, next) => {
    const search_name = String(req.query.searchTerm);
    try {
        const restaurants = await Restaurant.findAll({
            where: {
                name: {
                    [sequelize_1.Op.like]: `%${search_name}%`,
                },
            },
        });
        if (!restaurants || restaurants.length === 0) {
            res.status(404).json({
                error: "A restaurant with that name not exists!",
                success: false,
            });
            return;
        }
        next();
    }
    catch (error) {
        console.error("Error searching restaurants:", error);
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};
exports.validateExistantRes_bySearchName = validateExistantRes_bySearchName;
