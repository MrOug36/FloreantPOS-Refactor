// frontend/src/slices/reportSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

interface SalesReport {
  totalSales: number;
  totalTransactions: number;
  averageTransactionValue: number;
}

interface InventoryReport {
  _id: string;
  name: string;
  stock: number;
  category: string;
  price: number;
}

interface PerformanceMetric {
  userId: string;
  username: string;
  totalSales: number;
  totalTransactions: number;
  averageTransactionValue: number;
}

interface ReportState {
  salesReport: SalesReport | null;
  inventoryReport: InventoryReport[];
  performanceMetrics: PerformanceMetric[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  salesReport: null,
  inventoryReport: [],
  performanceMetrics: [],
  loading: false,
  error: null,
};

// Async Thunks

export const fetchSalesReport = createAsyncThunk(
  'reports/fetchSalesReport',
  async (dates: { startDate: string; endDate: string }, { rejectWithValue }) => {
    try {
      const response = await api.get('/reports/sales', { params: dates });
      return response.data.report;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchInventoryReport = createAsyncThunk(
  'reports/fetchInventoryReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/reports/inventory');
      return response.data.report;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchPerformanceMetrics = createAsyncThunk(
  'reports/fetchPerformanceMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/reports/performance');
      return response.data.metrics;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Slice

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Sales Report
    builder.addCase(fetchSalesReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSalesReport.fulfilled, (state, action) => {
      state.loading = false;
      state.salesReport = action.payload;
    });
    builder.addCase(fetchSalesReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Inventory Report
    builder.addCase(fetchInventoryReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchInventoryReport.fulfilled, (state, action) => {
      state.loading = false;
      state.inventoryReport = action.payload;
    });
    builder.addCase(fetchInventoryReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Performance Metrics
    builder.addCase(fetchPerformanceMetrics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPerformanceMetrics.fulfilled, (state, action) => {
      state.loading = false;
      state.performanceMetrics = action.payload;
    });
    builder.addCase(fetchPerformanceMetrics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default reportSlice.reducer;
