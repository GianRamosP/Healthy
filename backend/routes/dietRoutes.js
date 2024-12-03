// routes/dietRoutes.js
const express = require("express");
const {
  addDiet,
  getUserDiets,
  getAllDiets,
  updateDiet,
  deleteDiet,
} = require("../controllers/dietController");
const { protect, verifyRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/diets", protect, verifyRole("admin"), addDiet);
router.get("/diets", protect, getAllDiets);
router.get("/diets/:userId", protect, getUserDiets);
router.put("/diets/:id", protect, verifyRole("admin"), updateDiet);
router.delete("/diets/:id", protect, verifyRole("admin"), deleteDiet);

module.exports = router;
