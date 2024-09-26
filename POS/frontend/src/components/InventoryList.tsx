// frontend/src/components/InventoryList.tsx

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProducts, addProduct } from '../slices/inventorySlice';

const InventoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.inventory);

  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    supplier: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addProduct(newProduct)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setOpen(false);
        setNewProduct({
          name: '',
          description: '',
          category: '',
          price: 0,
          stock: 0,
          supplier: '',
        });
      }
    });
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Inventory</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Product
        </Button>
      </Box>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Supplier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Product Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            value={newProduct.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            inputProps={{ min: 0 }}
            value={newProduct.stock}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Supplier"
            name="supplier"
            value={newProduct.supplier}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InventoryList;
