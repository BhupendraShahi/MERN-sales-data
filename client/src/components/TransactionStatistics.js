import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCombinedData } from "../transactionsSlice";
import { monthOptions } from "../utils";

const TransactionsStatistics = () => {
  const dispatch = useDispatch();
  const { totalSaleAmount, totalSoldItems, totalNotSoldItems, month } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchCombinedData({ month }));
  }, [month]);

  return (
    <div>
      <h1>Statistics - {monthOptions[month - 1]}</h1>
      <p>Total Sale Amount: {totalSaleAmount}</p>
      <p>Total Sold Items: {totalSoldItems}</p>
      <p>Total Not Sold Items: {totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
