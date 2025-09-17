const mongoose = require("mongoose");

const PotsSchema = new mongoose.Schema({
  id: String,
  name: String,
  target: Number,
  total: Number,
  theme: String,
});

module.exports = (potsdDB) => potsdDB.model("Pots", PotsSchema);
