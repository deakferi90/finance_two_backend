const Budgets = require("../models/Budget.js");

const seedBudgets = async () => {
  await Budgets.deleteMany({});
  await Budgets.insertMany([
    {
      id: 1,
      category: "Entertainment",
      maximum: 50.0,
      theme: "#277C78",
      color: "Green",
    },
    {
      id: 2,
      category: "Bills",
      maximum: 750.0,
      theme: "#82C9D7",
      color: "Cyan",
    },
    {
      id: 3,
      category: "Groceries",
      maximum: 110.0,
      theme: "#426CD5",
      color: "Blue",
      optional: true,
    },
    {
      id: 4,
      category: "Dining Out",
      maximum: 75.0,
      theme: "#F2CDAC",
      color: "Desert Sand",
    },
    {
      id: 5,
      category: "Transportation",
      maximum: 110.0,
      theme: "#FFA500b3",
      color: "Orange",
      optional: true,
    },
    {
      id: 6,
      category: "Personal Care",
      maximum: 100.0,
      theme: "#626070",
      color: "Gray",
    },
    {
      id: 7,
      category: "Education",
      maximum: 50.0,
      theme: "#FFB6C1CC",
      color: "Pink",
      optional: true,
    },
  ]);
};

seedBudgets();
