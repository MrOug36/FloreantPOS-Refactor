// frontend/src/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transactionReducer from './slices/transactionSlice';
import inventoryReducer from './slices/inventorySlice';
import reportReducer from './slices/reportSlice';
import customerReducer from './slices/customerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    inventory: inventoryReducer,
    reports: reportReducer,
    customers: customerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
