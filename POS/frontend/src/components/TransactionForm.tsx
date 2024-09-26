// frontend/src/components/TransactionForm.tsx

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { createTransaction } from '../slices/transactionSlice';
import { fetchProducts } from '../slices/inventorySlice';
import { useNavigate } from 'react-router-dom';

interface TransactionItem {
  product: string;
  quantity: number;
  price: number;
}

const TransactionForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.inventory);
  const { loading, error } = useAppSelector((state) => state.transactions);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [items, setItems] = useState<TransactionItem[]>([
    { product: '', quantity: 1, price: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [items]);

  const handleItemChange = (index: number, field: keyof TransactionItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === 'product') {
      const selectedProduct = products.find((p) => p._id === value);
      if (selectedProduct) {
        updatedItems[index].price = selectedProduct.price;
      } else {
        updatedItems[index].price = 0;
      }
    }

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { product: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactionData = {
      paymentMethod,
      items,
      totalAmount,
    };
    dispatch(createTransaction(transactionData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard');
      }
    });
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} p={3} boxShadow={3}>
        <Typography variant="h5" gutterBottom>
          Create New Transaction
        </Typography>
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              value={paymentMethod}
              label="Payment Method"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="card">Card</MenuItem>
              <MenuItem value="digital_wallet">Digital Wallet</MenuItem>
            </Select>
          </FormControl>

          {items.map((item, index) => (
            <Paper key={index} style={{ padding: '1rem', marginBottom: '1rem' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth required>
                    <InputLabel id={`product-label-${index}`}>Product</InputLabel>
                    <Select
                      labelId={`product-label-${index}`}
                      value={item.product}
                      label="Product"
                      onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                    >
                      {products.map((product) => (
                        <MenuItem key={product._id} value={product._id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Quantity"
                    type="number"
                    inputProps={{ min: 1 }}
                    fullWidth
                    required
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Price"
                    type="number"
                    inputProps={{ min: 0, step: 0.01 }}
                    fullWidth
                    required
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, 'price', parseFloat(e.target.value) || 0)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <IconButton
                    color="secondary"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Button variant="outlined" startIcon={<Add />} onClick={addItem}>
            Add Item
          </Button>

          <Box mt={3}>
            <Typography variant="h6">Total Amount: ${totalAmount.toFixed(2)}</Typography>
          </Box>

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Processing...' : 'Submit Transaction'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default TransactionForm;
