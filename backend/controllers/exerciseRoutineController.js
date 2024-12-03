const ExerciseRoutine = require("../models/ExerciseRoutine");

const addExerciseRoutine = async (req, res) => {
  const { user, exerciseName, description, videoLink } = req.body;

  try {
    const routine = new ExerciseRoutine({
      user,
      exerciseName,
      description,
      videoLink,
    });
    await routine.save();
    res.status(201).json(routine);
  } catch (error) {
    console.error("Error al crear la rutina de ejercicio:", error);
    res.status(500).json({
      message: "Error al crear la rutina de ejercicio",
      error: error.message,
    });
  }
};

const getUserExerciseRoutines = async (req, res) => {
  const { userId } = req.params;
  try {
    const routines = await ExerciseRoutine.find({ user: userId });
    console.log("Retrieved exercise routines:", routines); // Log para verificar los datos
    res.status(200).json(routines);
  } catch (error) {
    console.error("Error fetching routines:", error);
    res.status(500).json({ message: "Error fetching routines", error });
  }
};

const getAllExerciseRoutines = async (req, res) => {
  try {
    const routines = await ExerciseRoutine.find();
    res.status(200).json(routines);
  } catch (error) {
    console.error("Error al obtener las rutinas de ejercicio:", error);
    res.status(500).json({
      message: "Error al obtener las rutinas de ejercicio",
      error: error.message,
    });
  }
};

module.exports = {
  addExerciseRoutine,
  getUserExerciseRoutines,
  getAllExerciseRoutines,
};
