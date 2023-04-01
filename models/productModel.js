const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User",
    },
    useremail: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productTitle: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: String, required: true },
    productImage: { type: String, required: true },
    productCategory: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
