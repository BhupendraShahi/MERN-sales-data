import ProductTransaction from "../models/ProductTransaction.js";

export const getBarChartData = async (req, res) => {
  const { month = 3 } = req.query;

  try {
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const barChartData = {};

    for (const range of priceRanges) {
      const matchQuery = {
        $and: [
          { price: { $gte: range.min, $lt: range.max } },
          { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } },
        ],
      };

      const count = await ProductTransaction.aggregate([
        { $match: matchQuery },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]);

      barChartData[`range_${range.min}_${range.max}`] =
        count.length > 0 ? count[0].count : 0;
    }

    res.json(barChartData);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching bar chart data." });
  }
};
