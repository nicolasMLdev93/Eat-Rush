const express = require("express");
const router = express.Router();

// Chain validators //
const {
  validateCreateProduct,
  validateRegisterUser,
  validateLoginUser,
  validateCreateRestaurant,
  validateCreateCategory,
  validateSoftDelete,
} = require("../middlewares/chain_validators");
// Results validators //
const { validate_Results } = require("../middlewares/results_validator");
// Existence validators //
const {
  validateExistantUser_register,
  validateExistantUser_login,
  validateExistantCreateCategory,
  validateExistantCreateRestaurant,
  validateExistantCreateProduct,
  validateExistantDeleteRest,
  validateExistantDeleteCat,
  validateExistantDeleteProd,
} = require("../middlewares/existence_validators");

// Validate admin with token
const { validateAdminToken } = require("../middlewares/validate_admin");

// Controllers//
const {
  getProducts,
  getRestaurants,
  getCategories,
  registerUser,
  loginUser,
  createProduct,
  createRestaurant,
  createCategory,deleteRestaurant,deleteProduct,deleteCategory
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
  "/product",
  validateCreateProduct,
  validate_Results,
  validateExistantCreateProduct,
  validateAdminToken,
  createProduct
);

router.post(
  "/restaurant",
  validateCreateRestaurant,
  validate_Results,
  validateExistantCreateRestaurant,
  validateAdminToken,
  createRestaurant
);

router.post(
  "/category",
  validateCreateCategory,
  validate_Results,
  validateExistantCreateCategory,
  validateAdminToken,
  createCategory
);

// Create new user and login //
// Create users //
router.post(
  "/register",
  validateRegisterUser,
  validate_Results,
  validateExistantUser_register,
  registerUser
);

// Login users//
router.post(
  "/login",
  validateLoginUser,
  validate_Results,
  validateExistantUser_login,
  loginUser
);

// Delete products, categories and restaurants (with soft delete)//
router.put(
  "/product",
  validateSoftDelete,
  validate_Results,
  validateAdminToken,
  validateExistantDeleteProd,deleteProduct
);

router.put(
  "/restaurant",
  validateSoftDelete,
  validate_Results,
  validateAdminToken,
  validateExistantDeleteRest,deleteRestaurant
);

router.put(
  "/category",
  validateSoftDelete,
  validate_Results,
  validateAdminToken,
  validateExistantDeleteCat,deleteCategory
);

module.exports = router;
export {};
