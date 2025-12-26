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
  validateGetRestaurant_Id,
  validateGetRestaurant_Name,
  validateGetCategory_Id,
  validateGetCategory_Name,
  validateCreateOrder,
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
  validateExistanRest_byId,
  validateExistantRes_byName,
  validateExistanCat_byId,
  validateExistantCat_byName,
  validateExistanCreateOrder,
} = require("../middlewares/existence_validators");

// Validate admin with token
const {
  validateAdminToken,
  validateUserToken,
} = require("../middlewares/validate_admin");

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
  getRest_byId,
  getRest_byName,
  getCategory_byId,
  getCat_byName,
  createOrder_items,
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

router.get(
  "/restaurant/:id",
  validateGetRestaurant_Id,
  validate_Results,
  validateExistanRest_byId,
  getRest_byId
);

router.get(
  "/restaurant/name/:nameSlug",
  validateGetRestaurant_Name,
  validate_Results,
  validateExistantRes_byName,
  getRest_byName
);

router.get(
  "/category/:id",
  validateGetCategory_Id,
  validate_Results,
  validateExistanCat_byId,
  getCategory_byId
);

router.get(
  "/category/name/:nameSlug",
  validateGetCategory_Name,
  validate_Results,
  validateExistantCat_byName,
  getCat_byName
);

// Insert orders and products in each order
router.post(
  "/new_order",
  validateCreateOrder,
  validate_Results,
  validateUserToken,
  validateExistanCreateOrder,
  createOrder_items
);

module.exports = router;
export {};
