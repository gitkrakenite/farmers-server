const express = require("express");
const {
  fetchIssues,
  createIssue,
  deleteIssue,
} = require("../controllers/issueController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", fetchIssues); //fetch all issues
router.post("/", protect, createIssue); //create issue
router.delete("/:id", protect, deleteIssue); //delete your own issue

module.exports = router;
