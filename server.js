const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

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

const Transaction = require("./models/Transactions")(transactionsDB);

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

const budgetRoutes = require("./routes/budgetRoutes")(budgetsDB);
app.use("/api/budgets", budgetRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
