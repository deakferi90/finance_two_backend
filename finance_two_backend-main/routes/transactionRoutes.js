const express = require("express");
const router = express.Router();

module.exports = (transactionsDB) => {
  const Transaction = require("../models/Transactions")(transactionsDB);

  router.get("/", async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  return router;
};
