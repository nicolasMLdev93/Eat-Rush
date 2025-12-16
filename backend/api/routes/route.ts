const express = require("express");
const router = express.Router()

const { getProducts,getRestaurants,getCategories } = require('../controllers/controllers')

// Get products //
router.get('/products',getProducts)
// Get restaurants //
router.get('/restaurants',getRestaurants)
// Get categories //
router.get('/categories',getCategories)

module.exports = router;
export {};