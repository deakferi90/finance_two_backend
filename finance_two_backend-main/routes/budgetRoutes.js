const express = require("express");
const router = express.Router();

module.exports = (budgetsDB) => {
  const Budget = require("../models/Budget")(budgetsDB); // ✅ Pass `budgetsDB`

  router.get("/", async (req, res) => {
    try {
      const budgets = await Budget.find().sort({ id: 1 });
      res.json(budgets);
    } catch (error) {
      console.error("❌ Error fetching budgets:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  router.post("/", async (req, res) => {
    try {
      const { id, category, amount, theme, color, optional } = req.body;

      if (!id || !category || amount == null) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if a budget with this ID already exists
      const existingBudget = await Budget.findOne({ id });

      if (existingBudget) {
        // Update existing budget
        existingBudget.category = category;
        existingBudget.amount = amount;
        existingBudget.theme = theme;
        existingBudget.color = color;
        existingBudget.optional = optional;

        await existingBudget.save();
        console.log("✅ Budget updated:", existingBudget);
        return res.status(200).json(existingBudget);
      } else {
        // Create a new budget
        const newBudget = new Budget({
          id,
          category,
          amount,
          theme,
          color,
          optional,
        });

        await newBudget.save();
        console.log("✅ New budget added:", newBudget);
        return res.status(201).json(newBudget);
      }
    } catch (error) {
      console.error("❌ Error adding/updating budget:", error);
      res.status(500).json({ message: "Failed to add/update budget", error });
    }
  });
  return router;
};
