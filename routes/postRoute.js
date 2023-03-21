const express = require("express");
const {
  createPost,
  fetchPosts,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createPost);
router.get("/fetch", fetchPosts);
router.delete("/delete/:id", protect, deletePost);

module.exports = router;
