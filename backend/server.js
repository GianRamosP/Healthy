const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const dietRoutes = require("./routes/dietRoutes");

const authRoutes = require("./routes/authRoutes");
const exerciseRoutineRoutes = require("./routes/exerciseRoutineRoutes");

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", dietRoutes);

app.use("/api", exerciseRoutineRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
