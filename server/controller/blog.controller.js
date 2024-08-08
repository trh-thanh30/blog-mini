const Blog = require("../models/blog.model");
const createBlog = async (req, res) => {
  if (!req.user.isAdmin) {
    return res
      .status(401)
      .json({ message: "You are not an admin to create a post" });
  }
  try {
    const { title, image, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    const newBlog = new Blog({
      title,
      image,
      description,
      slug,
      userId: req.user.id,
    });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { createBlog };
