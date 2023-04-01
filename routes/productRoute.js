const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchProducts,
  createProduct,
  fetchProductOnCategory,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", fetchProducts);
router.post("/cat", fetchProductOnCategory); //fetch based on category
router.post("/", protect, createProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
