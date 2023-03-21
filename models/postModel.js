const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
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
    info: { type: String, required: true },
    postImg: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
