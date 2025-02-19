const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/auth_demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  console.log("✅ Connected to MongoDB")
);
mongoose.connection.on("error", (err) =>
  console.log("❌ MongoDB connection error:", err)
);

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
