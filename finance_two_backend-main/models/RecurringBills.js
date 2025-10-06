// models/RecurringBills.js
const mongoose = require("mongoose");

const RecurringBillsSchema = new mongoose.Schema({
  id: Number,
  avatar: String,
  title: String,
  dueDate: String,
  status: { type: String, enum: ["ok", "bad", "neutral"] },
  amount: Number,
});

module.exports = (db) => db.model("RecurringBill", RecurringBillsSchema);
