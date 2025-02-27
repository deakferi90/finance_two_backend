const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  amount: Number,
  category: String,
  theme: String,
  color: String,
  optional: Boolean,
});

module.exports = (budgetsDB) => budgetsDB.model("Budget", BudgetSchema);
