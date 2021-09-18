const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true
  }
)

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;