// frontend/src/slices/transactionSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

interface TransactionItem {
  product: string;
  quantity: number;
  price: number;
}

interface Transaction {
  _id: string;
  user: string;
  items: TransactionItem[];
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

// Async Thunks

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/transactions');
      return response.data.transactions;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transactionData: Omit<Transaction, '_id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/transactions', transactionData);
      return response.data.transaction;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Slice

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Transactions
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Transaction
    builder.addCase(createTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions.push(action.payload);
    });
    builder.addCase(createTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default transactionSlice.reducer;
