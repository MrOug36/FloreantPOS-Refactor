// frontend/src/components/ReportView.tsx

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  fetchSalesReport,
  fetchInventoryReport,
  fetchPerformanceMetrics,
} from '../slices/reportSlice';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

const ReportView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { salesReport, inventoryReport, performanceMetrics, loading, error } = useAppSelector(
    (state) => state.reports
  );

  const [startDate, setStartDate] = useState<Date | null>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleGenerateSalesReport = () => {
    if (startDate && endDate) {
      dispatch(
        fetchSalesReport({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchInventoryReport());
    dispatch(fetchPerformanceMetrics());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={2}>
        <Typography variant="h5">Reports</Typography>
      </Box>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <Paper style={{ padding: '1rem', marginBottom: '2rem' }}>
        <Typography variant="h6" gutterBottom>
          Sales Report
        </Typography>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateSalesReport}
                fullWidth
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Report'}
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
        {salesReport && (
          <Box mt={2}>
            <Typography>Total Sales: ${salesReport.totalSales.toFixed(2)}</Typography>
            <Typography>Total Transactions: {salesReport.totalTransactions}</Typography>
            <Typography>
              Average Transaction Value: ${salesReport.averageTransactionValue.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
              Inventory Report
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryReport.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Total Sales ($)</TableCell>
                  <TableCell>Total Transactions</TableCell>
                  <TableCell>Avg. Transaction Value ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {performanceMetrics.map((metric) => (
                  <TableRow key={metric.userId}>
                    <TableCell>{metric.username}</TableCell>
                    <TableCell>{metric.totalSales.toFixed(2)}</TableCell>
                    <TableCell>{metric.totalTransactions}</TableCell>
                    <TableCell>{metric.averageTransactionValue.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportView;
