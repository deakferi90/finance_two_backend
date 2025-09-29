const mongoose = require("mongoose");
const createPotsModel = require("../models/Pots");

const potsDB = mongoose.createConnection("mongodb://localhost:27017/potsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PotsData = [
  {
    id: 1,
    name: "Savings",
    target: 2000.0,
    total: 159.0,
    theme: "#277C78",
  },
  {
    id: 2,
    name: "Concert Ticket",
    target: 150.0,
    total: 110.0,
    theme: "#626070",
  },
  {
    id: 3,
    name: "Gift",
    target: 150.0,
    total: 110.0,
    theme: "#82C9D7",
  },
  {
    id: 4,
    name: "New Laptop",
    target: 1000.0,
    total: 10.0,
    theme: "#F2CDAC",
  },
  {
    id: 5,
    name: "Holiday",
    target: 1440.0,
    total: 531.0,
    theme: "#826CB0",
  },
];

potsDB.once("open", async () => {
  console.log("✅ Connected to potsDB for seeding...");

  const Pot = createPotsModel(potsDB);

  try {
    await Pot.deleteMany({});
    console.log("🗑️ Cleared existing pots collection");

    await Pot.insertMany(PotsData);
    console.log("🌱 Pots seeded successfully!");

    potsDB.close();
  } catch (error) {
    console.error("❌ Error seeding pots:", error);
    potsDB.close();
  }
});
