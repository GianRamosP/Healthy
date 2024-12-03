const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Token inválido" });
    }
  }

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó un token" });
  }
};

// Middleware para verificar el rol
const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    } else {
      return res.status(403).json({ message: "Acceso denegado" });
    }
  };
};

module.exports = { protect, verifyRole };
