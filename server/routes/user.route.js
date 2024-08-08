const express = require("express");
const { test, updateUser, deleteUser } = require("../controller/user.controller");
const verifyToken = require("../verifyToken");
const router = express.Router();
router.post("/test", test);
router.post("/updateUser/:id", verifyToken, updateUser);
router.delete("/deleteUser/:id", verifyToken, deleteUser);

module.exports = router;
