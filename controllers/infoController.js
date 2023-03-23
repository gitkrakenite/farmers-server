const Information = require("../models/infoModel");
const User = require("../models/userModel");

// @create  POST
// http://localhost:8000/api/v1/info
// private
const createInfo = async (req, res, next) => {
  const { title, category, information } = req.body;
  if (!title || !information || !category) {
    res.status(404).json({ message: "fields missing" });
    return;
  }
  try {
    const info = await Information.create({
      information,
      category,
      title,
      username: req.user.name,
      userId: req.user.id,
    });

    res.status(201).send(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @fetch  GET
// http://localhost:8000/api/v1/info
// public
const fetchInfo = async (req, res, next) => {
  try {
    const info = await Information.find().sort({ $natural: -1 });
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @delete  DELETE
// http://localhost:8000/api/v1/info/:id
// private
const deleteInfo = async (req, res, next) => {
  // check if posts exist
  const info = await Information.findById(req.params.id);

  if (!info) {
    res.status(400).json({ message: "information not found" });
    return;
  }

  const user = await User.findById(req.user.id); //find the logged in user from db

  // check for user
  if (!user) {
    res.status(401).send("user not found");
    return;
  }

  // compare the user who created the goal with the logged in user
  if (info?.username?.toString() !== user.name) {
    res.status(401).send("Not Authorized");
    return;
  }

  try {
    await Information.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete post" });
  }
};

// DESC     update my info
// METHOD   PUT http://localhost:8000/api/v1/info/:id
// ACCESS   private
const updateInfo = async (req, res) => {
  const info = await Information.findById(req.params.id);

  if (!info) {
    res.status(400).json({ message: "information not found" });
    return;
  }

  const user = await User.findById(req.user.id); //find the logged in user from db

  // check for user
  if (!user) {
    res.status(401).send("user not found");
    return;
  }

  // compare the user who created the goal with the logged in user
  if (info?.username?.toString() !== user.name) {
    res.status(401).send("Not Authorized");
    return;
  }

  try {
    const updatedInfo = await Information.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(400).json({ message: "Could not update info" });
  }
};

module.exports = { createInfo, fetchInfo, updateInfo, deleteInfo };
