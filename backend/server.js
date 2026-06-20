const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const eventRoutes = require("./routes/eventRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", eventRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/hello", (req, res) => {
  res.send("Hello Works");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});