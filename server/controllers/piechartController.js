import ProductTransaction from "../models/ProductTransaction.js";

export const getPieChartData = async (req, res) => {
  const { month = 3 } = req.query;

  try {
    const pieChartData = await ProductTransaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        },
      },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(pieChartData);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pie chart data." });
  }
};
