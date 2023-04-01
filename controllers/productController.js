const Product = require("../models/productModel");
const User = require("../models/userModel");

// @create  POST
// http://localhost:8000/api/v1/product
// private
const createProduct = async (req, res, next) => {
  const {
    productTitle,
    productDescription,
    productPrice,
    productImage,
    productCategory,
  } = req.body;

  // console.log(req.body);

  if (!productTitle || !productDescription || !productPrice || !productImage) {
    res.status(404).json({ message: "fields missing" });
    return;
  }
  try {
    const product = await Product.create({
      productTitle,
      productDescription,
      productPrice,
      productImage,
      productCategory,
      username: req.user.name,
      useremail: req.user.email,
      userId: req.user.id,
    });

    res.status(201).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @fetch  GET
// http://localhost:5000/api/v1/product
// public
const fetchProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ $natural: -1 });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @fetch  GET
// http://localhost:5000/api/v1/product/cat
// public
const fetchProductOnCategory = async (req, res) => {
  // console.log(req.body);
  const { productCategory } = req.body;

  if (!productCategory) {
    res.status(400).send("No category sent");
    return;
  }

  try {
    const products = await Product.find({
      productCategory: productCategory,
    }).sort({ $natural: -1 });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @delete  DELETE
//localhost:5000/api/v1/product/delete/:id
// http: private;
const deleteProduct = async (req, res, next) => {
  // check if product exist
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400).json({ message: "product not found" });
    return;
  }

  const user = await User.findById(req.user.id); //find the logged in user from db

  // check for user
  if (!user) {
    res.status(401).send("user not found");
    return;
  }

  // compare the user who created the goal with the logged in user
  if (product?.username?.toString() !== user.name) {
    res.status(401).send("Not Authorized");
    return;
  }

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete product" });
  }
};

module.exports = {
  createProduct,
  fetchProducts,
  fetchProductOnCategory,
  deleteProduct,
};
