import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../config";

export const fetchTransactions = createAsyncThunk('transactions/fetch', async ({month, searchQuery, page}) => {
  const response = await axiosInstance.get(`/api/transactions?month=${month}&page=${page}&search=${searchQuery}`);
  return response.data;
});

export const fetchCombinedData = createAsyncThunk('combinedData/fetch', async ({month}) => {
  const response = await axiosInstance.get(`/api/combined-data?month=${month}`);
  console.log(response.data, "combined");
  return response.data;
})

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
    barChartData: [],
    pieChartData: [],
    isLoading: false,
    page: 1,
    perPage: 10,
    searchQuery: '',
    month: 3,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setMonth(state, action) {
      state.month = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.transactions;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(fetchCombinedData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCombinedData.fulfilled, (state, action) => {
        state.totalSaleAmount = action.payload.statistics.totalSaleAmount;
        state.totalSoldItems = action.payload.statistics.totalSoldItems;
        state.totalNotSoldItems = action.payload.statistics.totalNotSoldItems;
        state.barChartData = action.payload.barChartData;
        state.pieChartData = action.payload.pieChartData;
      })
      .addCase(fetchCombinedData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setSearchQuery, setMonth } = transactionsSlice.actions;
export default transactionsSlice.reducer;
