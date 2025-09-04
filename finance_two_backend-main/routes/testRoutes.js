const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(201).json({ message: "Test Works" });
});

module.exports = router;
