const express = require("express");
const {
  fetchInfo,
  createInfo,
  deleteInfo,
  updateInfo,
} = require("../controllers/infoController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", fetchInfo); //fetch all info
router.post("/", protect, createInfo); //create info
router.delete("/:id", protect, deleteInfo); //delete your own info
router.put("/:id", protect, updateInfo); //update your own info

module.exports = router;
