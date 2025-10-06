const mongoose = require("mongoose");

const RecurringBillsSchema = new mongoose.Schema({
  id: Number,
  avatar: String,
  title: String,
  dueDate: String,
  status: String,
  amount: Number,
});

module.exports = (db) => db.model("RecurringBill", RecurringBillsSchema);
