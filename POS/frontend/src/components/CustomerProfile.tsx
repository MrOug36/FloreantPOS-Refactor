// frontend/src/components/CustomerProfile.tsx

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCustomers, createCustomer, fetchCustomerById, clearSelectedCustomer } from '../slices/customerSlice';

const CustomerProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { customers, selectedCustomer, loading, error } = useAppSelector((state) => state.customers);

  const [search, setSearch] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleSearch = () => {
    // Implement search functionality if needed
    // For simplicity, filtering is done locally
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    dispatch(createCustomer(newCustomer)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setNewCustomer({
          name: '',
          email: '',
          phone: '',
          address: '',
        });
      }
    });
  };

  const handleSelectCustomer = (id: string) => {
    dispatch(fetchCustomerById(id));
  };

  const handleCloseProfile = () => {
    dispatch(clearSelectedCustomer());
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={2}>
        <Typography variant="h5">Customers</Typography>
      </Box>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <Box mb={3}>
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h6" gutterBottom>
            Add New Customer
          </Typography>
          <Box display="flex" flexDirection="column" gap="1rem">
            <TextField
              label="Name"
              name="name"
              value={newCustomer.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={newCustomer.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={newCustomer.phone}
              onChange={handleChange}
              required
            />
            <TextField
              label="Address"
              name="address"
              value={newCustomer.address}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={handleCreate} disabled={loading}>
              {loading ? 'Adding...' : 'Add Customer'}
            </Button>
          </Box>
        </Paper>
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Loyalty Points</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .filter(
                (customer) =>
                  customer.name.toLowerCase().includes(search.toLowerCase()) ||
                  customer.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.loyaltyPoints}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleSelectCustomer(customer._id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Customer Profile Dialog */}
      {selectedCustomer && (
        <Paper style={{ padding: '1rem', marginTop: '2rem' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Customer Profile</Typography>
            <Button variant="text" color="secondary" onClick={handleCloseProfile}>
              Close
            </Button>
          </Box>
          <Box mt={2}>
            <Typography><strong>Name:</strong> {selectedCustomer.name}</Typography>
            <Typography><strong>Email:</strong> {selectedCustomer.email}</Typography>
            <Typography><strong>Phone:</strong> {selectedCustomer.phone}</Typography>
            <Typography><strong>Address:</strong> {selectedCustomer.address}</Typography>
            <Typography><strong>Loyalty Points:</strong> {selectedCustomer.loyaltyPoints}</Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="h6">Purchase History</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCustomer.purchaseHistory.map((purchase, index) => (
                  <TableRow key={index}>
                    <TableCell>{purchase.transaction}</TableCell>
                    <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
                    <TableCell>{purchase.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default CustomerProfile;
