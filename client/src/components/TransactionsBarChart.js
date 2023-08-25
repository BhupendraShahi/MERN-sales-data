import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
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

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TransactionsBarChart = () => {
  const { barChartData, month } = useSelector((state) => state.transactions);

  const option = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: `Bar Chart Stats - ${monthOptions[month-1]}`,
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
        label: `No. of items in the price range for - ${monthOptions[month-1]}`,
        data: barChartData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex justify-center items-center w-1/2 h-1/2">
      <Bar options={option} data={data} />
    </div>
  );
};

export default TransactionsBarChart;
