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
const Budget = require("./models/Budget")(budgetsDB);

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

app.get("/api/budgets/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findOne({ id: Number(id) });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json(budget);
  } catch (error) {
    console.error("❌ Error fetching budget:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/budgets/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBudget = req.body;

  console.log("🛠️ Updating Budget ID:", id);
  console.log("📦 New Data:", updatedBudget);

  try {
    const budget = await Budget.findOneAndUpdate(
      { id: Number(id) },
      {
        $set: {
          amount: updatedBudget.amount,
          category: updatedBudget.category,
          theme: updatedBudget.theme,
          color: updatedBudget.color,
        },
      },
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json(budget);
  } catch (error) {
    console.error("❌ Error updating budget:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/budgets/reset", async (req, res) => {
  const budgetData = [
    {
      id: 1,
      category: "Entertainment",
      amount: 50.0,
      theme: "#277C78",
      color: "Green",
    },
    {
      id: 2,
      category: "Bills",
      amount: 750.0,
      theme: "#82C9D7",
      color: "Cyan",
    },
    {
      id: 3,
      category: "Groceries",
      amount: 110.0,
      theme: "#426CD5",
      color: "Blue",
      optional: true,
    },
    {
      id: 4,
      category: "Dining Out",
      amount: 75.0,
      theme: "#F2CDAC",
      color: "Desert Sand",
    },
    {
      id: 5,
      category: "Transportation",
      amount: 110.0,
      theme: "#FFA500b3",
      color: "Orange",
      optional: true,
    },
    {
      id: 6,
      category: "Personal Care",
      amount: 100.0,
      theme: "#626070",
      color: "Gray",
    },
    {
      id: 7,
      category: "Education",
      amount: 50.0,
      theme: "#FFB6C1CC",
      color: "Pink",
      optional: true,
    },
  ];

  try {
    await Budget.deleteMany({});
    await Budget.insertMany(budgetData);

    res.json({ message: "✅ Database reset successfully!" });
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const budgetRoutes = require("./routes/budgetRoutes")(budgetsDB);
app.use("/api/budgets", budgetRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
