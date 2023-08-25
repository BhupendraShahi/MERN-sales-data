import TransactionsTable from "../components/TransactionTable";
import TransactionsStatistics from "../components/TransactionStatistics";
import TransactionsBarChart from "../components/TransactionsBarChart";

const Home = () => {
  return (
    <main>
      <h1 className="">Transactions Dashboard</h1>
      <div className="">
        <section>
          <TransactionsTable />
        </section>
        <section>
          <TransactionsStatistics />
        </section>
        <section>
          <TransactionsBarChart />
        </section>
      </div>
    </main>
  );
};

export default Home;
