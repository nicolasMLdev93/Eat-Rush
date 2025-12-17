const express = require("express");
const router = express.Router();

// Chain validators //
const {
  validateCreateProduct,
  validateRegisterUser,
  validateLoginUser,
} = require("../middlewares/chain_validators");
// Results validators //
const { vaidate_Results } = require("../middlewares/results_validator");
// Existence validators //
const {
  validateExistantUser_register,
  validateExistantUser_login,
  validateAdminToken,
} = require("../middlewares/existence_validators");
// Controllers//
const {
  getProducts,
  getRestaurants,
  getCategories,
  registerUser,
  loginUser,
  createProduct,
} = require("../controllers/controllers");

// Basic getters //
// Get products //
router.get("/products", getProducts);
// Get restaurants //
router.get("/restaurants", getRestaurants);
// Get categories //
router.get("/categories", getCategories);

// Create products, restaurants and categories //
router.post(
  "/products",
  validateCreateProduct,
  vaidate_Results,
  validateAdminToken,
  createProduct
);

// Create users //
router.post(
  "/register",
  validateRegisterUser,
  vaidate_Results,
  validateExistantUser_register,
  registerUser
);

// Login users//
router.post(
  "/login",
  validateLoginUser,
  vaidate_Results,
  validateExistantUser_login,
  loginUser
);

module.exports = router;
export {};
