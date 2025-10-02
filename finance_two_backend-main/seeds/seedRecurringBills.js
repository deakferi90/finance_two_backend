const mongoose = require("mongoose");
const createBillsModel = require("../models/RecurringBills");

const recurringBillsDB = mongoose.createConnection(
  "mongodb://localhost:27017/recurringBillsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const RecurringBillsData = [
  {
    id: 1,
    avatar: "Spark",
    title: "Spark Electric Solutions",
    dueDate: "Monthly-2nd",
    amount: 100.0,
  },
  {
    id: 2,
    avatar: "Serenity",
    title: "Serenity Spa & Wellness",
    dueDate: "Monthly-3rd",
    amount: 30.0,
  },
  {
    id: 3,
    avatar: "Elevate",
    title: "Elevate Education",
    dueDate: "Monthly-4th",
    amount: 50.0,
  },
  {
    id: 4,
    avatar: "Pixel",
    title: "Pixel Playground",
    dueDate: "Monthly-11th",
    amount: 10.0,
  },
  {
    id: 5,
    avatar: "Nimbus",
    title: "Nimbus Data Storage",
    dueDate: "Monthly-21st",
    amount: 9.99,
  },
  {
    id: 6,
    avatar: "ByteWise",
    title: "Bytewise",
    dueDate: "Monthly-23rd",
    amount: 49.99,
  },
  {
    id: 7,
    avatar: "EcoFuel",
    title: "EcoFuel Energy",
    dueDate: "Monthly-29th",
    amount: 35.0,
  },
  {
    id: 8,
    avatar: "AquaFlow",
    title: "Aqua Flow Utilities",
    dueDate: "Monthly-30th",
    amount: 100.0,
  },
];

recurringBillsDB.once("open", async () => {
  console.log("✅ Connected to recurringBillsDB for seeding...");

  const Bills = createBillsModel(recurringBillsDB);

  try {
    await Bills.deleteMany({});
    console.log("🗑️ Cleared existing recurringBills collection");

    await Bills.insertMany(RecurringBillsData);
    console.log("🌱 recurringBills seeded successfully!");

    recurringBillsDB.close();
  } catch (error) {
    console.error("❌ Error seeding recurringBills:", error);
    recurringBillsDB.close();
  }
});
