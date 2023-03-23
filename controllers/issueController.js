const Issue = require("../models/issueModel");
const User = require("../models/userModel");

// @create  POST
// http://localhost:8000/api/v1/issue
// private
const createIssue = async (req, res, next) => {
  const { alertInfo } = req.body;
  // console.log(req.body);
  if (!alertInfo) {
    res.status(404).json({ message: "Info missing" });
    console.log(alertInfo);
    return;
  }
  try {
    const issue = await Issue.create({
      info: alertInfo,
      username: req.user.name,
      userId: req.user.id,
    });

    res.status(201).send(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @fetch  GET
// http://localhost:8000/api/v1/issue
// public
const fetchIssues = async (req, res, next) => {
  try {
    const issue = await Issue.find().sort({ $natural: -1 });
    res.status(200).send(issue);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @delete  DELETE
// http://localhost:8000/api/v1/issue/:id
// private
const deleteIssue = async (req, res, next) => {
  // check if issue exist
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    res.status(400).json({ message: "Issue not found" });
    return;
  }

  const user = await User.findById(req.user.id); //find the logged in user from db

  // check for user
  if (!user) {
    res.status(401).send("user not found");
    return;
  }

  // compare the user who created the goal with the logged in user
  if (issue?.username?.toString() !== user.name) {
    res.status(401).send("Not Authorized");
    return;
  }

  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete issue" });
  }
};

module.exports = { createIssue, deleteIssue, fetchIssues };
