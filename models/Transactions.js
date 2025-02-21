const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  id: String,
  avatar: String,
  name: String,
  category: String,
  date: String,
  amount: Number,
  recurring: Boolean,
});

module.exports = (transactionsDB) =>
  transactionsDB.model("Transaction", TransactionSchema);
