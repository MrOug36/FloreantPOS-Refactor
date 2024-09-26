// frontend/src/slices/customerSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

interface PurchaseHistory {
  transaction: string;
  date: string;
  amount: number;
}

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  loyaltyPoints: number;
  purchaseHistory: PurchaseHistory[];
}

interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

// Async Thunks

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/customers');
      return response.data.customers;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (customerData: Omit<Customer, '_id' | 'purchaseHistory'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/customers', customerData);
      return response.data.customer;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchCustomerById = createAsyncThunk(
  'customers/fetchCustomerById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/customers/${id}`);
      return response.data.customer;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Slice

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearSelectedCustomer(state) {
      state.selectedCustomer = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Customers
    builder.addCase(fetchCustomers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Customer
    builder.addCase(createCustomer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customers.push(action.payload);
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Customer By ID
    builder.addCase(fetchCustomerById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCustomerById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCustomer = action.payload;
    });
    builder.addCase(fetchCustomerById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSelectedCustomer } = customerSlice.actions;

export default customerSlice.reducer;
