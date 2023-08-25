import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTransactions,
  setPage,
  setSearchQuery,
  setMonth,
} from "../transactionsSlice";
import { monthOptions } from "../utils";

const TransactionsTable = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading, page, searchQuery, month } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions({ month, searchQuery, page }));
  }, [month, searchQuery, page]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleMonthChange = (e) => {
    dispatch(setMonth(e.target.value));
  };

  const handlePreviousPage = () => {
    dispatch(setPage(page - 1));
  };

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          className="border rounded p-2"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search transactions"
        />
        <select
          className="border rounded p-2"
          onChange={handleMonthChange}
          value={month}
        >
          {monthOptions.map((monthName, index) => (
            <option key={index} value={index + 1}>
              {monthName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="border rounded p-2 mb-2">
            <p>Transaction ID: {transaction.id}</p>
            <p>Title: {transaction.title}</p>
            <p>Description: {transaction.description}</p>
            <p>Price: {transaction.price}</p>
            <p>Category: {transaction.category}</p>
            <p>Sold: {transaction.sold ? "True" : "False"}</p>
            <p>Image: {transaction.image}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
