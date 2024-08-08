const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    image: {
      type: String,
      default:
        "https://cloud.z.com/vn/wp-content/uploads/2023/11/how-to-write-a-blog-post.jpeg",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
