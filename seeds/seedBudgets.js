const mongoose = require("mongoose");
const createBudgetModel = require("../models/Budget");

const budgetData = [
  {
    id: 1,
    category: "Entertainment",
    amount: 50.0,
    theme: "#277C78",
    color: "Green",
    optional: false,
  },
  {
    id: 2,
    category: "Bills",
    amount: 750.0,
    theme: "#82C9D7",
    color: "Cyan",
    optional: false,
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
    optional: false,
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
    optional: false,
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

const seedBudgets = async () => {
  try {
    const budgetsDB = await mongoose.connect(
      "mongodb://localhost:27017/budgetsDB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const Budget = createBudgetModel(mongoose.connection);

    await Budget.deleteMany({});
    console.log("🗑️ Cleared existing budgets");

    await Budget.insertMany(budgetData);
    console.log("✅ New budgets seeded successfully!");

    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error seeding budgets:", error);
    mongoose.connection.close();
  }
};

seedBudgets();
