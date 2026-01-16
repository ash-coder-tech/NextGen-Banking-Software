const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Banking API is running 🚀",
    status: "OK"
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bank", require("./routes/bankRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
