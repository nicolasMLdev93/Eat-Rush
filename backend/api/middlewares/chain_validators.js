"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateOrder = exports.validateGetCategory_Name = exports.validateGetCategory_Id = exports.validateGetRestaurant_Name = exports.validateGetRestaurant_Id = exports.validateGetProduct_Rest = exports.validateGetProduct_Cat = exports.validateGetProduct_Id = exports.validateSoftDelete = exports.validateCreateCategory = exports.validateCreateRestaurant = exports.validateLoginUser = exports.validateRegisterUser = exports.validateCreateProduct = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateProduct = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("The name of the product must be a string!")
        .notEmpty()
        .withMessage("The field 'name' can´t be empty!"),
    (0, express_validator_1.body)("description")
        .isString()
        .withMessage("The description of the product must be a string!")
        .notEmpty()
        .withMessage("The field 'description' can´t be empty!")
        .isLength({ max: 100 })
        .withMessage("The length of the description can´t be higher than 100!"),
    (0, express_validator_1.body)("price")
        .isFloat({ min: 1, max: 10000 })
        .withMessage("The price of the product must be a float and higher than $1 and lower than 10000!")
        .notEmpty()
        .withMessage("The field 'price' can´t be empty!"),
    (0, express_validator_1.body)("isAvailable")
        .isBoolean()
        .withMessage("The field 'isAvailable' must be boolean")
        .notEmpty()
        .withMessage("The field 'isAvailable' can´t be empty!"),
    (0, express_validator_1.body)("categoryId")
        .notEmpty()
        .withMessage("The field 'categoryId' can´t be empty!")
        .isInt()
        .withMessage("The field 'categoryId' must be an integer!"),
    (0, express_validator_1.body)("restaurantId")
        .notEmpty()
        .withMessage("The field 'restaurantId' can´t be empty!")
        .isInt()
        .withMessage("The field 'restaurantId' must be an integer!"),
];
exports.validateRegisterUser = [
    (0, express_validator_1.body)("firstName")
        .trim()
        .isString()
        .withMessage("First name must be a string!")
        .notEmpty()
        .withMessage("First name is required!")
        .isLength({ min: 2, max: 50 })
        .withMessage("First name must be between 2 and 50 characters!")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("First name can only contain letters and spaces!"),
    (0, express_validator_1.body)("surName")
        .trim()
        .isString()
        .withMessage("Surname must be a string!")
        .notEmpty()
        .withMessage("Surname is required!")
        .isLength({ min: 2, max: 50 })
        .withMessage("Surname must be between 2 and 50 characters!")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("Surname can only contain letters and spaces!"),
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address!")
        .notEmpty()
        .withMessage("Email is required!")
        .isLength({ max: 100 })
        .withMessage("Email cannot exceed 100 characters!"),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password must be a string!")
        .notEmpty()
        .withMessage("Password is required!")
        .isLength({ min: 8, max: 100 })
        .withMessage("Password must be between 8 and 100 characters!")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character!"),
    (0, express_validator_1.body)("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match!");
        }
        return true;
    }),
    (0, express_validator_1.body)("role")
        .optional()
        .isString()
        .withMessage("Role must be a string!")
        .isIn(["admin", "user"])
        .withMessage("Invalid role! Must be: admin or user")
        .default("admin"),
    (0, express_validator_1.body)("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be a boolean (true/false)!")
        .toBoolean()
        .default(true),
];
exports.validateLoginUser = [
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address!")
        .notEmpty()
        .withMessage("Email is required!")
        .isLength({ max: 100 })
        .withMessage("Email cannot exceed 100 characters!"),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password must be a string!")
        .notEmpty()
        .withMessage("Password is required!"),
];
exports.validateCreateRestaurant = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("The name of the restaurant must be a string!")
        .notEmpty()
        .withMessage("The field 'name' can't be empty!")
        .isLength({ max: 50 })
        .withMessage("The length of the name can't be higher than 50 characters!"),
    (0, express_validator_1.body)("description")
        .isString()
        .withMessage("The description of the restaurant must be a string!")
        .notEmpty()
        .withMessage("The field 'description' can't be empty!")
        .isLength({ max: 200 })
        .withMessage("The length of the description can't be higher than 200 characters!"),
    (0, express_validator_1.body)("address")
        .isString()
        .withMessage("The address of the restaurant must be a string!")
        .notEmpty()
        .withMessage("The field 'address' can't be empty!")
        .isLength({ max: 100 })
        .withMessage("The length of the address can't be higher than 100 characters!"),
    (0, express_validator_1.body)("phone")
        .isString()
        .withMessage("The phone number must be a string!")
        .notEmpty()
        .withMessage("The field 'phone' can't be empty!")
        .matches(/^[\d\s\-()+]+$/)
        .withMessage("The phone number format is invalid!")
        .isLength({ min: 8, max: 20 })
        .withMessage("The phone number must be between 8 and 20 characters!"),
    (0, express_validator_1.body)("isActive")
        .isBoolean()
        .withMessage("The field 'isActive' must be a boolean!")
        .notEmpty()
        .withMessage("The field 'isActive' can't be empty!"),
];
exports.validateCreateCategory = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("The category name must be a string!")
        .notEmpty()
        .withMessage("The field 'name' can't be empty!")
        .isLength({ max: 50 })
        .withMessage("The length of the category name can't be higher than 50 characters!")
        .trim()
        .escape(),
    (0, express_validator_1.body)("isActive")
        .isBoolean()
        .withMessage("The field 'isActive' must be a boolean!")
        .notEmpty()
        .withMessage("The field 'isActive' can't be empty!"),
];
exports.validateSoftDelete = [
    (0, express_validator_1.body)("id")
        .notEmpty()
        .withMessage("The field 'Id' can´t be empty!")
        .isInt()
        .withMessage("The field 'Id' must be an integer!"),
];
exports.validateGetProduct_Id = [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .withMessage("The field 'Id' can´t be empty!")
        .isNumeric()
        .withMessage("The field 'Id' must be numeric!"),
];
exports.validateGetProduct_Cat = [
    (0, express_validator_1.param)("categoryId")
        .notEmpty()
        .withMessage("The field 'categoryId' can´t be empty!")
        .isNumeric()
        .withMessage("The field 'categoryId' must be numeric!"),
];
exports.validateGetProduct_Rest = [
    (0, express_validator_1.param)("restaurantId")
        .notEmpty()
        .withMessage("The field 'restaurantId' can´t be empty!")
        .isNumeric()
        .withMessage("The field 'restaurantId' must be numeric!"),
];
exports.validateGetRestaurant_Id = [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .withMessage("The field 'Id' can´t be empty!")
        .isNumeric()
        .withMessage("The field 'Id' must be numeric!"),
];
exports.validateGetRestaurant_Name = [
    (0, express_validator_1.param)("nameSlug")
        .notEmpty()
        .withMessage("The field 'nameSlug' can´t be empty!")
        .isString()
        .withMessage("The field 'nameSlug' must be a string!"),
];
exports.validateGetCategory_Id = [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .withMessage("The field 'Id' can´t be empty!")
        .isNumeric()
        .withMessage("The field 'Id' must be numeric!"),
];
exports.validateGetCategory_Name = [
    (0, express_validator_1.param)("nameSlug")
        .notEmpty()
        .withMessage("The field 'nameSlug' can´t be empty!")
        .isString()
        .withMessage("The field 'nameSlug' must be a string!"),
];
exports.validateCreateOrder = [
    (0, express_validator_1.body)("totalAmount")
        .notEmpty()
        .withMessage("Total amount is required")
        .isFloat({ min: 0 })
        .withMessage("Total amount must be a positive number")
        .toFloat(),
    (0, express_validator_1.body)("deliveryAddress")
        .notEmpty()
        .withMessage("Delivery address is required")
        .isString()
        .withMessage("Delivery address must be text")
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage("Delivery address must be between 5 and 200 characters"),
    (0, express_validator_1.body)("deliveryNotes")
        .optional()
        .isString()
        .withMessage("Delivery notes must be text")
        .trim()
        .isLength({ max: 500 })
        .withMessage("Delivery notes must not exceed 500 characters"),
    (0, express_validator_1.body)("paymentMethod")
        .notEmpty()
        .withMessage("Payment method is required")
        .isString()
        .withMessage("Payment method must be text")
        .isIn(["Cash", "Credit Card", "Debit Card", "Mobile Payment"])
        .withMessage("Invalid payment method"),
    (0, express_validator_1.body)("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isInt({ min: 1 })
        .withMessage("User ID must be a positive integer")
        .toInt(),
    (0, express_validator_1.body)("restaurantId")
        .notEmpty()
        .withMessage("Restaurant ID is required")
        .isInt({ min: 1 })
        .withMessage("Restaurant ID must be a positive integer")
        .toInt(),
    (0, express_validator_1.body)("items")
        .notEmpty()
        .withMessage("Items are required")
        .isArray({ min: 1 })
        .withMessage("There must be at least one item in the order"),
];
