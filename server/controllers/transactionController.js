import ProductTransaction from "../models/ProductTransaction.js";

export const getTransactions = async (req, res) => {
  const { month, search = "", page = 1, perPage = 10 } = req.query;
  try {
    const searchQuery = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    if (!isNaN(parseFloat(search))) {
      searchQuery.$or.push({ price: parseFloat(search) });
    }

    let query = {
      $and: [searchQuery],
    };

    if (month !== undefined) {
      query.$and.push({
        $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
      });
    }

    const transactions = await ProductTransaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({transactions: transactions});
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching transactions." });
  }
};

