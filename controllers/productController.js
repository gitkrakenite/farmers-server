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
// http://localhost:5000/api/v1/posts/delete/:id
// private
// const deletePost = async (req, res, next) => {
//   // check if posts exist
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     res.status(400).json({ message: "post not found" });
//     return;
//   }

//   const user = await User.findById(req.user.id); //find the logged in user from db

//   // check for user
//   if (!user) {
//     res.status(401).send("user not found");
//     return;
//   }

//   // compare the user who created the goal with the logged in user
//   if (post?.username?.toString() !== user.name) {
//     res.status(401).send("Not Authorized");
//     return;
//   }

//   try {
//     await Post.findByIdAndDelete(req.params.id);
//     res.status(200).json({ id: req.params.id });
//   } catch (error) {
//     res.status(400).json({ message: "Could not delete post" });
//   }
// };

module.exports = { createProduct, fetchProducts, fetchProductOnCategory };
