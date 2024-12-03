const mongoose = require("mongoose");

const exerciseRoutineSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exerciseName: { type: String, required: true },
  description: { type: String, required: true },
  videoLink: { type: String },
});

const ExerciseRoutine = mongoose.model(
  "ExerciseRoutine",
  exerciseRoutineSchema
);
module.exports = ExerciseRoutine;
