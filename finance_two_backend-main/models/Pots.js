const mongoose = require("mongoose");

const PotsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    target: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
    theme: {
      type: String,
      default: "#000000",
    },
  },
  {
    collection: "pots", // explicitly set collection name
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = (potsDB) => potsDB.model("Pots", PotsSchema);
