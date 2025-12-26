"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Product, Restaurant, Category, User, OrderItem, Order, } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Get all products from Database //
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                isAvailable: true,
            },
        });
        res.status(200).json({
            products: products,
            success: true,
        });
    }
    catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Get all restaurants from Database //
exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({
            where: {
                isActive: true,
            },
        });
        res.status(200).json({
            restaurants: restaurants,
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Get all categories from Database //
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: {
                isActive: true,
            },
        });
        res.status(200).json({
            categories: categories,
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Register new user on database //
exports.registerUser = async (req, res) => {
    const { firstName, surName, email, password, isActive, role } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        await User.create({
            firstName: firstName,
            surName: surName,
            email: email,
            password: hashPassword,
            isActive: isActive,
            role: role,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(200).json({ Success: "New user created!", success: true });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Login user //
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await User.findOne({ where: { email: email } });
        const match = await bcrypt.compare(password, result.password);
        if (match) {
            const token = jwt.sign({
                token: result.id,
                email: result.email,
                role: result.role,
            }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
            res.status(200).json({
                message: `Welcome user ${email}`,
                token: token,
                success: true,
            });
        }
        else {
            res
                .status(400)
                .json({ error: "Invalid password! Try again!", success: false });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Register new product //
exports.createProduct = async (req, res) => {
    const { name, description, price, isAvailable, categoryId, restaurantId } = req.body;
    try {
        await Product.create({
            name: name,
            description: description,
            price: price,
            isAvailable: isAvailable,
            categoryId: categoryId,
            restaurantId: restaurantId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(201).json({
            success: true,
            message: "New product created successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Register new Restaurant //
exports.createRestaurant = async (req, res) => {
    const { name, description, address, phone, isActive } = req.body;
    try {
        await Restaurant.create({
            name: name,
            description: description,
            address: address,
            phone: phone,
            isActive: isActive,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(201).json({
            success: true,
            message: "New restaurant created successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Register new Restaurant //
exports.createCategory = async (req, res) => {
    const { name, isActive } = req.body;
    try {
        await Category.create({
            name: name,
            isActive: isActive,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(201).json({
            success: true,
            message: "New category created successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Delete product (soft delete)
exports.deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        await Product.update({ isAvailable: false }, {
            where: {
                id: id,
            },
        });
        res.status(201).json({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Delete category (soft delete)
exports.deleteCategory = async (req, res) => {
    const { id } = req.body;
    try {
        await Category.update({ isActive: false }, {
            where: {
                id: id,
            },
        });
        await Product.update({ isAvailable: false }, {
            where: {
                categoryId: id,
            },
        });
        res.status(201).json({
            success: true,
            message: "Category deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Delete restaurant (soft delete)
exports.deleteRestaurant = async (req, res) => {
    const { id } = req.body;
    try {
        await Restaurant.update({ isActive: false }, {
            where: {
                id: id,
            },
        });
        await Product.update({ isAvailable: false }, {
            where: {
                restaurantId: id,
            },
        });
        res.status(201).json({
            success: true,
            message: "Restaurant deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
// Get products, rest. and cat. by params and query params //
exports.getProd_byId = async (req, res) => {
    const { id } = req.params;
    try {
        const products = await Product.findAll({
            where: {
                id: id,
            },
        });
        res.status(201).json({
            success: true,
            products: products,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.getProd_byCat = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await Product.findAll({
            where: {
                categoryId: categoryId,
            },
        });
        res.status(201).json({
            success: true,
            products: products,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.getProd_byRest = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const products = await Product.findAll({
            where: {
                restaurantId: restaurantId,
            },
        });
        res.status(201).json({
            success: true,
            products: products,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.getRest_byId = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                id: id,
            },
        });
        res.status(201).json({
            success: true,
            restaurant: restaurant,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.getRest_byName = async (req, res) => {
    const { nameSlug } = req.params;
    try {
        const restaurant = await Restaurant.findOne({
            where: { name: nameSlug },
        });
        res.status(201).json({
            success: true,
            restaurant: restaurant,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.getCategory_byId = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({
            where: {
                id: id,
            },
        });
        res.status(201).json({
            success: true,
            category: category,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.getCat_byName = async (req, res) => {
    const { nameSlug } = req.params;
    try {
        const category = await Category.findOne({
            where: { name: nameSlug },
        });
        res.status(201).json({
            success: true,
            category: category,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.createOrder_items = async (req, res) => {
    const { totalAmount, deliveryAddress, deliveryNotes, paymentMethod, userId, restaurantId, items, } = req.body;
    try {
        const new_order = await Order.create({
            totalAmount: totalAmount,
            status: "Pending",
            deliveryAddress: deliveryAddress,
            deliveryNotes: deliveryNotes,
            paymentMethod: paymentMethod,
            userId: userId,
            restaurantId: restaurantId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const orderItems = items.map((item) => ({
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.subtotal,
            orderId: new_order.id,
            productId: item.productId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        await Order.bulkCreate(orderItems);
        res.status(200).json({ Success: "New order created!", success: true });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
