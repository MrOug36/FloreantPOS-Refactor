// frontend/src/components/Dashboard.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            POS Dashboard
          </Typography>
          <Typography variant="body1" style={{ marginRight: '1rem' }}>
            {user?.username}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
              <Typography variant="h6">Manage Transactions</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '1rem' }}
                onClick={() => navigate('/transactions')}
              >
                Transactions
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
              <Typography variant="h6">Manage Inventory</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '1rem' }}
                onClick={() => navigate('/inventory')}
              >
                Inventory
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
              <Typography variant="h6">View Reports</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '1rem' }}
                onClick={() => navigate('/reports')}
              >
                Reports
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
              <Typography variant="h6">Manage Customers</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '1rem' }}
                onClick={() => navigate('/customers')}
              >
                Customers
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
