const mongoose = require("mongoose");
const createOverviewModel = require("../models/Overview");

const overviewData = [{ current: 4836.0, income: 3814.25, expenses: 1700.5 }];

const seedOverview = async () => {
  try {
    const overviewDB = mongoose.createConnection(
      "mongodb://localhost:27017/overviewDB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    overviewDB.on("connected", async () => {
      console.log("✅ Connected to overviewDB");
      const Overview = createOverviewModel(overviewDB);

      await Overview.deleteMany({});
      await Overview.insertMany(overviewData);
      console.log("✅ Overview seeded successfully!");

      await overviewDB.close();
      console.log("🔌 Connection closed");
    });
  } catch (error) {
    console.error("❌ Error seeding overview:", error);
  }
};

seedOverview();
