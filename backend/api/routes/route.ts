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
  validateGetProduct_Id,
  validateGetProduct_Cat,
  validateGetProduct_Rest,
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
  validateExistanProd_byId,
  validateExistanProd_byCat,
  validateExistanProd_byRest,
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
  createCategory,
  deleteRestaurant,
  deleteProduct,
  deleteCategory,
  getProd_byId,
  getProd_byCat,
  getProd_byRest,
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
  validateExistantDeleteProd,
  deleteProduct
);

router.put(
  "/restaurant",
  validateSoftDelete,
  validate_Results,
  validateAdminToken,
  validateExistantDeleteRest,
  deleteRestaurant
);

router.put(
  "/category",
  validateSoftDelete,
  validate_Results,
  validateAdminToken,
  validateExistantDeleteCat,
  deleteCategory
);

// Get products, restaurants, categories by params and query params //
router.get(
  "/products_id/:id",
  validateGetProduct_Id,
  validate_Results,
  validateExistanProd_byId,
  getProd_byId
);

router.get(
  "/products_cat/:categoryId",
  validateGetProduct_Cat,
  validate_Results,
  validateExistanProd_byCat,
  getProd_byCat
);

router.get(
  "/products_rest/:restaurantId",
  validateGetProduct_Rest,
  validate_Results,
  validateExistanProd_byRest,
  getProd_byRest
);

module.exports = router;
export {};
