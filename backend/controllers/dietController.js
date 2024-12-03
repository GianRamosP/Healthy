const Diet = require("../models/Diet");

const addDiet = async (req, res) => {
  const { user, foodName, calories, description } = req.body;

  try {
    const diet = new Diet({ user, foodName, calories, description });
    await diet.save();
    res.status(201).json(diet);
  } catch (error) {
    console.error("Error al crear la dieta:", error);
    res.status(500).json({
      message: "Error al crear la dieta",
      error: error.message,
    });
  }
};

const getUserDiets = async (req, res) => {
  const { userId } = req.params;
  try {
    const diets = await Diet.find({ user: userId });
    console.log("Retrieved diets:", diets); // Log para verificar los datos
    res.status(200).json(diets);
  } catch (error) {
    console.error("Error fetching diets:", error);
    res.status(500).json({ message: "Error fetching diets", error });
  }
};

const getAllDiets = async (req, res) => {
  try {
    const diets = await Diet.find();
    res.status(200).json(diets);
  } catch (error) {
    console.error("Error al obtener las dietas:", error);
    res.status(500).json({
      message: "Error al obtener las dietas",
      error: error.message,
    });
  }
};

const updateDiet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDiet = await Diet.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedDiet) {
      return res.status(404).json({ message: "Dieta no encontrada" });
    }
    res.status(200).json(updatedDiet);
  } catch (error) {
    console.error("Error en el servidor al actualizar la dieta:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const deleteDiet = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDiet = await Diet.findByIdAndDelete(id);

    if (!deletedDiet) {
      return res.status(404).json({ message: "Dieta no encontrada" });
    }
    res.status(200).json({ message: "Dieta eliminada correctamente" });
  } catch (error) {
    console.error("Error en el servidor al eliminar la dieta:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  addDiet,
  getUserDiets,
  getAllDiets,
  updateDiet,
  deleteDiet,
};
