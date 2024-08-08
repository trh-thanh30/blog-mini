const express = require("express");
const verifyToken = require("../verifyToken");
const { createBlog } = require("../controller/blog.controller");
const router = express.Router();
router.post("/createBlog", verifyToken, createBlog);

module.exports = router;
