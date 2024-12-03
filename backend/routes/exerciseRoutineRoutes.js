const express = require("express");
const {
  addExerciseRoutine,
  getUserExerciseRoutines,
  getAllExerciseRoutines,
} = require("../controllers/exerciseRoutineController");
const { protect, verifyRole } = require("../middleware/authMiddleware");
const ExerciseRoutine = require("../models/ExerciseRoutine");

const router = express.Router();

router.post("/routines", protect, verifyRole("admin"), addExerciseRoutine);
router.get("/routines", protect, getAllExerciseRoutines);
router.get("/routines/:userId", protect, getUserExerciseRoutines);

router.delete(
  "/routines/:id",
  protect,
  verifyRole("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRoutine = await ExerciseRoutine.findByIdAndDelete(id);

      if (!deletedRoutine) {
        return res.status(404).json({ message: "Exercise routine not found" });
      }
      res
        .status(200)
        .json({ message: "Exercise routine deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.put("/routines/:id", protect, verifyRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoutine = await ExerciseRoutine.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedRoutine) {
      return res.status(404).json({ message: "Exercise routine not found" });
    }
    res.status(200).json(updatedRoutine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
