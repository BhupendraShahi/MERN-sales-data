import express from "express";
import ProductTransaction from "../models/ProductTransaction.js";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    const seedData = response.data;
      
    await ProductTransaction.deleteMany({});
    await ProductTransaction.insertMany(seedData);

    console.log("Database seeded successfully.");
    res.status(200).json({ message: "Database seeded successfully." });
  } catch (error) {
    console.error("Error seeding database:", error);
  }
});

export default router;
