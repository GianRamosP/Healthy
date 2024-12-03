const User = require("../models/User");
const ExerciseRoutine = require("../models/ExerciseRoutine");
const Diet = require("../models/Diet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Registrar usuario
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hash de la contraseña almacenada:", hashedPassword);
    const user = new User({
      name,
      email,
      password,
      role,
    });
    console.log("Hash de la contraseña almacenada:", user.password);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const createUserAsAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const adminUser = await User.findById(req._id);
    if (adminUser.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al crear usuario como administrador:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  await check("email", "El correo electrónico es inválido").isEmail().run(req);
  await check("password", "La contraseña es requerida").notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    console.log("Email:", email);
    console.log("Password:", password);

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("Contraseña ingresada:", password);
    console.log("Hash de la base de datos:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("¿Las contraseñas coinciden?", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Error en el login:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Nuevo: Obtener cantidad total de usuarios
const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total users", error });
  }
};

// Nuevo: Obtener detalles de usuario específico
const getUserDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    const exercisesCount = await ExerciseRoutine.countDocuments({
      user: userId,
    });
    const dietsCount = await Diet.countDocuments({ user: userId });

    res.status(200).json({
      user: user.name,
      exercisesCount,
      dietsCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  createUserAsAdmin,
  deleteUser,
  getTotalUsers,
  getUserDetails,
};
