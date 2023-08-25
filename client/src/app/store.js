import { configureStore } from '@reduxjs/toolkit';
import transactions from '../features/transactionsSlice';

export const store = configureStore({
  reducer: {
    transactions,
  }
});

export default store;
