import ProductTransaction from "../models/ProductTransaction.js";

export const getStatistics = async (req, res) => {
  const { month = 3 } = req.query;

  try {
    const monthNum = parseInt(month);

    const totalSaleAmount = await ProductTransaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNum] },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    const totalSoldItems = await ProductTransaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNum] },
      sold: true,
    });

    const totalNotSoldItems = await ProductTransaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNum] },
      sold: false,
    });

    res.json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
      totalSoldItems: totalSoldItems,
      totalNotSoldItems: totalNotSoldItems,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching statistics." });
  }
};
