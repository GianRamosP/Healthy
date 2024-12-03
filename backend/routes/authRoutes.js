// routes/authRoutes.js

const express = require("express");
const { verifyToken } = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req._id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
