const express = require("express");
const router = express.Router();

module.exports = (potsDB) => {
  const Pots = require("../models/Pots")(potsDB);

  router.get("/", async (req, res) => {
    try {
      const pots = await Pots.find();
      res.status(200).json(pots);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { id, name, target, total, theme } = req.body;

      if (!id || !category || amount == null) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const existingBudget = await Budget.findOne({ id });

      if (existingBudget) {
        existingBudget.name = name;
        existingBudget.target = target;
        existingBudget.total = total;
        existingBudget.theme = theme;

        await existingBudget.save();
        console.log("✅ Budget updated:", existingBudget);
        return res.status(200).json(existingBudget);
      } else {
        const newBudget = new Budget({
          id,
          name,
          target,
          total,
          theme,
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
