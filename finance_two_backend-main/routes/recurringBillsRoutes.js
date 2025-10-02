const express = require("express");
const router = express.Router();

module.exports = (recurringBillsDB) => {
  const RecurringBills = require("../models/RecurringBills")(recurringBillsDB);

  router.get("/", async (req, res) => {
    try {
      const recurringBills = await RecurringBills.find();
      res.status(200).json(recurringBills);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  return router;
};
