import axios from "axios";

export const getCombinedData = async (req, res) => {
  const { month = 3 } = req.query;

  try {
    const statisticsResponse = await axios.get(
      `http://localhost:8080/api/statistics?month=${month}`
    );
    const barChartResponse = await axios.get(
      `http://localhost:8080/api/bar-chart?month=${month}`
    );
    const pieChartResponse = await axios.get(
      `http://localhost:8080/api/pie-chart?month=${month}`
    );

    const combinedData = {
      statistics: statisticsResponse.data,
      barChartData: barChartResponse.data,
      pieChartData: pieChartResponse.data,
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching combined data." });
  }
};
