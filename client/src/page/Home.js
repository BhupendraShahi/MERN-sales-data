import React from "react";
import TransactionsTable from "../components/TransactionTable";
import TransactionsStatistics from "../components/TransactionStatistics";
import TransactionsBarChart from "../components/TransactionsBarChart";
import TransactionsPieChart from "../components/TransactionsPieChart";

const Home = () => {
  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-semibold mb-4">Transactions Dashboard</h1>
      <div className="flex flex-col items-center justify-center space-y-8">
        <section className="bg-white p-4 rounded shadow-md w-full">
          <h2 className="text-xl font-semibold mb-2">Transactions Table</h2>
          <TransactionsTable />
        </section>
        <section className="bg-white p-4 rounded shadow-md w-full">
          <h2 className="text-xl font-semibold mb-2">
            Transactions Statistics
          </h2>
          <TransactionsStatistics />
        </section>
        <section className="flex p-4 rounded shadow-md w-full">
          <div className="w-1/2 h-1/2 flex bg-white p-4 rounded shadow-md flex-col mr-4">
            <h2 className="text-xl font-semibold mb-2">
              Transactions Pie Chart
            </h2>
            <TransactionsPieChart />
          </div>
          <div className="w-1/2 h-1/2 flex bg-white p-4 rounded shadow-md flex-col ml-4">
            <h2 className="text-xl font-semibold mb-2">
              Transactions Bar Chart
            </h2>
            <TransactionsBarChart />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
