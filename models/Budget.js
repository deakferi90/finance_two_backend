const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  amount: Number,
  category: String,
  theme: String,
  color: String,
  optional: { type: Boolean, required: true },
});

module.exports = (budgetsDB) => {
  return budgetsDB.model("Budget", BudgetSchema);
};
