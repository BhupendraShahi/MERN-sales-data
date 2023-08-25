import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTransactions,
  setPage,
  setSearchQuery,
  setMonth,
} from "../transactionsSlice";
import _ from "lodash";
import { monthOptions } from "../utils";

const TransactionsTable = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading, page, searchQuery, month } = useSelector(
    (state) => state.transactions
  );

  const debouncedFetchTransactions = _.debounce(
    (month, searchQuery, page) => {
      dispatch(fetchTransactions({ month, searchQuery, page }));
    },
    300
  );

  useEffect(() => {
    debouncedFetchTransactions(month, searchQuery, page);
  }, [month, searchQuery, page]);

  const handleSearchChange = (e) => {
    e.preventDefault();
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
    <div className="p-4 bg-white rounded shadow">
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
        <div className="flex bg-gray-100 p-2 rounded-t">
          <p className="w-1/12 text-left">ID</p>
          <p className="w-3/12 text-left">Title</p>
          <p className="w-4/12 text-left">Description</p>
          <p className="w-1/12 text-left">Price</p>
          <p className="w-2/12 text-left">Category</p>
          <p className="w-2/12 text-left">Image</p>
        </div>

        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex border p-2 mb-2">
            <p className="w-1/12">{transaction.id}</p>
            <p className="w-3/12">{transaction.title}</p>
            <p className="w-4/12">{transaction.description}</p>
            <p className="w-1/12">${transaction.price.toFixed(2)}</p>
            <p className="w-2/12">{transaction.category}</p>
            <img src={transaction.image} className="w-2/12" />
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
