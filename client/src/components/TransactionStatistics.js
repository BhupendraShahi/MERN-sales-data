import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCombinedData } from "../features/transactionsSlice";
import { monthOptions } from "../utils";

const TransactionsStatistics = () => {
  const dispatch = useDispatch();
  const { totalSaleAmount, totalSoldItems, totalNotSoldItems, month, isLoading } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchCombinedData({ month }));
  }, [month]);

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 bg-white rounded shadow-2xl">
      <h1 className="text-xl font-semibold mb-6">
        Transactions Statistics - {monthOptions[month - 1]}
      </h1>
      <p className="mb-1">Total Sale Amount: ${totalSaleAmount}</p>
      <p className="mb-1">Total Sold Items: {totalSoldItems}</p>
      <p className="mb-1">Total Not Sold Items: {totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
