// adminRoutes.js
const express = require("express");
const { createUserAsAdmin } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/users", authMiddleware, createUserAsAdmin);

module.exports = router;
