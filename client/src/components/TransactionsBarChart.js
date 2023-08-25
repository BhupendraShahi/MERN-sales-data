import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { monthOptions } from "../utils";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsBarChart = () => {
  const { barChartData, month, isLoading } = useSelector(
    (state) => state.transactions
  );

  const option = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: `Bar Chart Stats - ${monthOptions[month - 1]}`,
      },
    },
  };

  const data = {
    labels: [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "901-above",
    ],
    datasets: [
      {
        label: `No. of items in the price range for - ${
          monthOptions[month - 1]
        }`,
        data: barChartData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-fit">
      <div className="pb-6">
        <h2 className="text-xl font-semibold mb-2">
          Transactions Bar Chart - {monthOptions[month - 1]}
        </h2>
      </div>
      <div className="pb-4">
        <Bar options={option} data={data} />
      </div>
    </div>
  );
};

export default TransactionsBarChart;
