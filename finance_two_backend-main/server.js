const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const budgetsDB = mongoose.createConnection(
  "mongodb://localhost:27017/budgetsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

budgetsDB.on("connected", () =>
  console.log("✅ MongoDB connected to budgetsDB")
);
budgetsDB.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

const Budget = require("./models/Budget")(budgetsDB);

const budgetRoutes = require("./routes/budgetRoutes")(budgetsDB);
app.use("/api/budgets", budgetRoutes);

const potsDB = mongoose.createConnection("mongodb://localhost:27017/potsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

potsDB.on("connected", () => console.log("✅ MongoDB connected to potsDB"));

potsDB.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

const Pots = require("./models/Pots")(potsDB);
const potsRoutes = require("./routes/potsRoutes")(potsDB);
app.use("/api/pots", potsRoutes);

const transactionsDB = mongoose.createConnection(
  "mongodb://localhost:27017/transactionsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

transactionsDB.on("connected", () =>
  console.log("✅ MongoDB connected to transactionsDB")
);
transactionsDB.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
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

app.get("/api/pots", async (req, res) => {
  try {
    const pots = await Pots.find();
    res.json(pots);
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
  const updateData = req.body;

  try {
    const updatedBudget = await Budget.findOneAndUpdate(
      { id: Number(id) },
      { $set: updateData },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json(updatedBudget);
  } catch (error) {
    console.error("❌ Error updating budget:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/budgets/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBudget = await Budget.findOneAndDelete({ id: Number(id) });

    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json({ message: "Budget deleted successfully", deletedBudget });
  } catch (error) {
    console.error("❌ Error deleting budget:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/pots/:id", async (req, res) => {
  try {
    const potId = req.params.id;

    const deletedPot = await Pots.findByIdAndDelete(potId);

    if (!deletedPot) {
      return res.status(404).json({ message: "Pot not found" });
    }

    res.status(200).json({ message: "Pot deleted successfully", deletedPot });
  } catch (error) {
    console.error("Error deleting pot:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
