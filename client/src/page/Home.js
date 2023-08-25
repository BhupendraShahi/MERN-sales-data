import React from "react";
import TransactionsTable from "../components/TransactionTable";
import TransactionsStatistics from "../components/TransactionStatistics";
import TransactionsBarChart from "../components/TransactionsBarChart";
import TransactionsPieChart from "../components/TransactionsPieChart";

const Home = () => {
  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl text-center font-semibold mb-16 underline">Transactions Dashboard</h1>
      <div className="flex flex-col items-center justify-center space-y-8">
        <section className="bg-white p-4 rounded shadow-2xl w-full">
          <TransactionsTable />
        </section>
        <section className="bg-white p-4 rounded shadow-2xl w-full">
          <TransactionsStatistics />
        </section>
        <section className="flex bg-white p-4 rounded shadow-2xl w-full">
          <div className="w-1/2 h-1/2 flex bg-white p-4 rounded shadow-2xl flex-col mr-4">
            <TransactionsPieChart />
          </div>
          <div className="w-1/2 h-1/2 flex bg-white p-4 rounded shadow-2xl flex-col ml-4">
            <TransactionsBarChart />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
