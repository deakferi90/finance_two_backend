const mongoose = require("mongoose");
const createBillsModel = require("../models/RecurringBills");

const recurringBillsDB = mongoose.createConnection(
  "mongodb://localhost:27017/recurringBillsDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const RecurringBillsData = [
  {
    id: 1,
    avatar: "Spark",
    title: "Spark Electric Solutions",
    dueDate: "Monthly-2nd",
    status: "ok",
    amount: 100,
  },
  {
    id: 2,
    avatar: "Serenity",
    title: "Serenity Spa & Wellness",
    dueDate: "Monthly-3rd",
    status: "ok",
    amount: 30,
  },
  {
    id: 3,
    avatar: "Elevate",
    title: "Elevate Education",
    dueDate: "Monthly-4th",
    status: "ok",
    amount: 50,
  },
  {
    id: 4,
    avatar: "Pixel",
    title: "Pixel Playground",
    dueDate: "Monthly-11th",
    status: "ok",
    amount: 10,
  },
  {
    id: 5,
    avatar: "Nimbus",
    title: "Nimbus Data Storage",
    dueDate: "Monthly-21st",
    status: "bad",
    amount: 9.99,
  },
  {
    id: 6,
    avatar: "ByteWise",
    title: "Bytewise",
    dueDate: "Monthly-23rd",
    status: "bad",
    amount: 49.99,
  },
  {
    id: 7,
    avatar: "EcoFuel",
    title: "EcoFuel Energy",
    dueDate: "Monthly-29th",
    status: "neutral",
    amount: 35,
  },
  {
    id: 8,
    avatar: "AquaFlow",
    title: "Aqua Flow Utilities",
    dueDate: "Monthly-30th",
    status: "neutral",
    amount: 100,
  },
];

recurringBillsDB.once("open", async () => {
  const Bills = createBillsModel(recurringBillsDB);

  try {
    await Bills.collection.drop().catch((err) => {
      if (err.code === 26)
        console.log("Collection did not exist, skipping drop");
      else throw err;
    });

    await Bills.insertMany(RecurringBillsData);
    console.log("Recurring bills seeded successfully!");
    console.log(RecurringBillsData);

    recurringBillsDB.close();
  } catch (error) {
    console.error("Error seeding recurring bills:", error);
    recurringBillsDB.close();
  }
});
