const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Import auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Connect to TransactionsDB
const transactionsDB = mongoose.createConnection(
  "mongodb://localhost:27017/transactionsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
transactionsDB.on("connected", () =>
  console.log("MongoDB connected to transactionsDB")
);
transactionsDB.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Connect to BudgetsDB
const budgetsDB = mongoose.createConnection(
  "mongodb://localhost:27017/budgetsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
budgetsDB.on("connected", () => console.log("MongoDB connected to budgetsDB"));
budgetsDB.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Import Transaction Model
const Transaction = require("./models/Transactions")(transactionsDB);

// Transactions Route
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

// Import Budget Routes (Make sure budgetRoutes.js exports a function)
const budgetRoutes = require("./routes/budgetRoutes")(budgetsDB);
app.use("/api/budgets", budgetRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
