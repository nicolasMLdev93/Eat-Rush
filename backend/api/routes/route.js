"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
// Chain validators //
const { validateCreateProduct, validateRegisterUser, validateLoginUser, validateCreateRestaurant, validateCreateCategory, } = require("../middlewares/chain_validators");
// Results validators //
const { validate_Results } = require("../middlewares/results_validator");
// Existence validators //
const { validateExistantUser_register, validateExistantUser_login, validateAdminToken_createProduct, validateAdminToken_createRestaurant, validateAdminToken_createCategory, } = require("../middlewares/existence_validators");
// Controllers//
const { getProducts, getRestaurants, getCategories, registerUser, loginUser, createProduct, createRestaurant, createCategory, } = require("../controllers/controllers");
// Basic getters //
// Get products //
router.get("/products", getProducts);
// Get restaurants //
router.get("/restaurants", getRestaurants);
// Get categories //
router.get("/categories", getCategories);
// Create products, restaurants and categories //
router.post("/product", validateCreateProduct, validate_Results, validateAdminToken_createProduct, createProduct);
router.post("/restaurant", validateCreateRestaurant, validate_Results, validateAdminToken_createRestaurant, createRestaurant);
router.post("/category", validateCreateCategory, validate_Results, validateAdminToken_createCategory, createCategory);
// Create users //
router.post("/register", validateRegisterUser, validate_Results, validateExistantUser_register, registerUser);
// Login users//
router.post("/login", validateLoginUser, validate_Results, validateExistantUser_login, loginUser);
module.exports = router;
