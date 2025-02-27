const express = require("express");
const router = express.Router();

module.exports = (budgetsDB) => {
  const Budget = require("../models/Budget")(budgetsDB); // ✅ Pass `budgetsDB`

  router.get("/", async (req, res) => {
    try {
      const budgets = await Budget.find();
      console.log("📌 Budgets in Database:", budgets); // ✅ Debug log
      res.status(200).json(budgets);
    } catch (error) {
      console.error("❌ Error fetching budgets:", error);
      res.status(500).json({ message: "Failed to fetch budgets" });
    }
  });

  return router;
};
