const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/"); //fetch all news
router.post("/"); //admin create news
router.delete("/"); //admin delete news;

module.exports = router;
