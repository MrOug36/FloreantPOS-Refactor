// frontend/src/slices/inventorySlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
}

interface InventoryState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  products: [],
  loading: false,
  error: null,
};

// Async Thunks

export const fetchProducts = createAsyncThunk(
  'inventory/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/inventory');
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const addProduct = createAsyncThunk(
  'inventory/addProduct',
  async (productData: Omit<Product, '_id'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory', productData);
      return response.data.product;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Slice

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add Product
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default inventorySlice.reducer;
