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

  return router;
};
