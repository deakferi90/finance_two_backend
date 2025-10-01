const mongoose = require("mongoose");

const PotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    target: { type: Number, required: true },
    total: { type: Number, default: 0 },
    theme: { type: String, required: false },
    themeColor: { type: String },
    animatedValue: { type: Number },
  },
  { timestamps: true }
);

module.exports = (db) => db.model("Pot", PotSchema);
