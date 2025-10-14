const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema({
  current: Number,
  income: Number,
  expenses: Number,
});

module.exports = (connection) => {
  return (
    connection.models.Overview || connection.model("Overview", overviewSchema)
  );
};
