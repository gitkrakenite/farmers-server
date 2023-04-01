const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchProducts,
  createProduct,
  fetchProductOnCategory,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", fetchProducts);
router.post("/cat", fetchProductOnCategory); //fetch based on category
router.post("/", protect, createProduct);

module.exports = router;
