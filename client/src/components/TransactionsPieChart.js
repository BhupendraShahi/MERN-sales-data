import React from "react";
import { useSelector } from "react-redux";
import { monthOptions } from "../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TransactionsPieChart() {
  const { pieChartData, month, isLoading } = useSelector(
    (state) => state.transactions
  );

  const data = {
    labels: pieChartData.map((item) => item._id),
    datasets: [
      {
        label: "# of items",

        data: pieChartData.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/2 h-1/2">
      <div className="pb-4">
        <h2 className="text-xl font-semibold mb-2">
          Transactions Pie Chart - {monthOptions[month - 1]}
        </h2>
      </div>
      <div className="pb-6">
        <Pie data={data} />
      </div>
    </div>
  );
}
