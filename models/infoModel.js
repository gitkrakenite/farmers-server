const mongoose = require("mongoose");

const infoSchema = mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    information: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Information", infoSchema);
