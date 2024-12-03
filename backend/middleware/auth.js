// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("Token recibido:", token);

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó un token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }
    req._id = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
