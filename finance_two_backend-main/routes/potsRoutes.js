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
      const { name, target, total, theme } = req.body;

      if (!name || target == null || total == null || !theme) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newPot = new Pots({ name, target, total, theme });
      await newPot.save();

      res.status(201).json(newPot);
    } catch (error) {
      console.error("❌ Error creating pot:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });

  return router;
};
