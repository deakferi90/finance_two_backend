const express = require("express");
const router = express.Router();

module.exports = (overviewDB) => {
  const Overview = require("../models/Overview")(overviewDB);

  router.get("/", async (req, res) => {
    try {
      const overview = await Overview.find();
      res.status(200).json(overview);
    } catch (error) {
      console.error("Error fetching bills:", error);
      res.status(500).json({ message: "Failed to fetch bills" });
    }
  });

  return router;
};
