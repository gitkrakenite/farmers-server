const express = require("express");
const {
  getMe,
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// base_url = /api/v1/user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/mydet", protect, getMe); //get my details
router.get("/:id", getUser); //get a user
router.get("/", getAllUsers); //get a user

module.exports = router;
