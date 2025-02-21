const mongoose = require("mongoose");

const budgetsDB = mongoose.createConnection(
  "mongodb://localhost:27017/budgetsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const budgetSchema = new mongoose.Schema({
  id: Number,
  amount: Number,
  category: String,
  theme: String,
  color: String,
  optional: Boolean,
});

module.exports = (budgetsDB) => budgetsDB.model("Budget", budgetSchema);
